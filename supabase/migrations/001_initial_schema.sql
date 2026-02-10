-- Vomo Database Schema - Initial Migration
-- This migration creates all necessary tables for the volunteer management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table (for single org, but scalable to multi-org)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizers table (users who manage events)
CREATE TABLE organizers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  date DATE NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'America/Los_Angeles',
  public_link_id TEXT UNIQUE,
  password TEXT,
  created_by UUID REFERENCES organizers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shifts table
CREATE TABLE shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  role_name TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  total_slots INTEGER NOT NULL CHECK (total_slots > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteers table (no account required)
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shift signups (junction table)
CREATE TABLE shift_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
  volunteer_id UUID REFERENCES volunteers(id) ON DELETE CASCADE,
  notes TEXT,
  signed_up_at TIMESTAMPTZ DEFAULT NOW(),
  reminder_sent_at TIMESTAMPTZ,
  UNIQUE(shift_id, volunteer_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_events_public_link ON events(public_link_id);
CREATE INDEX idx_events_organization ON events(organization_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_shifts_event ON shifts(event_id);
CREATE INDEX idx_shifts_start_time ON shifts(start_time);
CREATE INDEX idx_signups_shift ON shift_signups(shift_id);
CREATE INDEX idx_signups_volunteer ON shift_signups(volunteer_id);
CREATE INDEX idx_volunteers_email ON volunteers(email);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift_signups ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Organizations
CREATE POLICY "Organizers can view their organization"
  ON organizations FOR SELECT
  USING (id IN (
    SELECT organization_id FROM organizers WHERE id = auth.uid()
  ));

-- RLS Policies for Organizers
CREATE POLICY "Organizers can view their own profile"
  ON organizers FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Organizers can update their own profile"
  ON organizers FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Allow organizer creation on signup"
  ON organizers FOR INSERT
  WITH CHECK (id = auth.uid());

-- RLS Policies for Events
CREATE POLICY "Organizers can view events in their organization"
  ON events FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM organizers WHERE id = auth.uid()
    )
  );

CREATE POLICY "Public can view events by public_link_id"
  ON events FOR SELECT
  USING (public_link_id IS NOT NULL);

CREATE POLICY "Organizers can create events"
  ON events FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM organizers WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organizers can update their organization's events"
  ON events FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id FROM organizers WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organizers can delete their organization's events"
  ON events FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id FROM organizers WHERE id = auth.uid()
    )
  );

-- RLS Policies for Shifts
CREATE POLICY "Organizers can view shifts for their events"
  ON shifts FOR SELECT
  USING (
    event_id IN (
      SELECT id FROM events WHERE organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Public can view shifts for public events"
  ON shifts FOR SELECT
  USING (
    event_id IN (
      SELECT id FROM events WHERE public_link_id IS NOT NULL
    )
  );

CREATE POLICY "Organizers can create shifts for their events"
  ON shifts FOR INSERT
  WITH CHECK (
    event_id IN (
      SELECT id FROM events WHERE organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizers can update shifts for their events"
  ON shifts FOR UPDATE
  USING (
    event_id IN (
      SELECT id FROM events WHERE organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Organizers can delete shifts for their events"
  ON shifts FOR DELETE
  USING (
    event_id IN (
      SELECT id FROM events WHERE organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

-- RLS Policies for Volunteers
CREATE POLICY "Anyone can create volunteer records"
  ON volunteers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Organizers can view all volunteers"
  ON volunteers FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM organizers WHERE id = auth.uid())
  );

CREATE POLICY "Public can view their own volunteer record by email"
  ON volunteers FOR SELECT
  USING (true);

-- RLS Policies for Shift Signups
CREATE POLICY "Anyone can sign up for shifts"
  ON shift_signups FOR INSERT
  WITH CHECK (
    shift_id IN (
      SELECT id FROM shifts WHERE event_id IN (
        SELECT id FROM events WHERE public_link_id IS NOT NULL
      )
    )
  );

CREATE POLICY "Organizers can view signups for their events"
  ON shift_signups FOR SELECT
  USING (
    shift_id IN (
      SELECT s.id FROM shifts s
      JOIN events e ON s.event_id = e.id
      WHERE e.organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Public can view their own signups"
  ON shift_signups FOR SELECT
  USING (true);

CREATE POLICY "Organizers can delete signups for their events"
  ON shift_signups FOR DELETE
  USING (
    shift_id IN (
      SELECT s.id FROM shifts s
      JOIN events e ON s.event_id = e.id
      WHERE e.organization_id IN (
        SELECT organization_id FROM organizers WHERE id = auth.uid()
      )
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shifts_updated_at
  BEFORE UPDATE ON shifts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create a default organization for single-org mode
INSERT INTO organizations (name) VALUES ('Vomo Organization');

-- Function to automatically create organizer profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_org_id UUID;
BEGIN
  -- Get the default organization ID
  SELECT id INTO default_org_id FROM organizations LIMIT 1;

  -- Create organizer profile
  INSERT INTO public.organizers (id, email, organization_id)
  VALUES (NEW.id, NEW.email, default_org_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create organizer profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Comments for documentation
COMMENT ON TABLE organizations IS 'Organizations that manage events';
COMMENT ON TABLE organizers IS 'Users who can create and manage events';
COMMENT ON TABLE events IS 'Events with volunteer shifts';
COMMENT ON TABLE shifts IS 'Time slots for volunteers within events';
COMMENT ON TABLE volunteers IS 'People who sign up for shifts (no account needed)';
COMMENT ON TABLE shift_signups IS 'Junction table linking volunteers to shifts';
