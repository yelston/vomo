import { CalendarPlus, Users, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: CalendarPlus,
    label: "Step 1",
    title: "Create Your Event",
    description: "Set up your event with details, location, date, and time. Define the shifts and roles you need volunteers for."
  },
  {
    icon: Users,
    label: "Step 2",
    title: "Invite Volunteers",
    description: "Share your event link with volunteers. They can browse available shifts and sign up for roles that fit their schedule."
  },
  {
    icon: ClipboardCheck,
    label: "Step 3",
    title: "Manage & Track",
    description: "Monitor volunteer signups in real-time, send reminders, and keep everything organized from your dashboard."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How Vomo Works</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A simple three-step process that makes volunteer coordination effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="rounded-lg border bg-card p-6">
              <span className="text-sm font-medium text-muted-foreground">{step.label}</span>
              <step.icon className="h-5 w-5 text-primary mt-3" />
              <h3 className="font-semibold mt-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
