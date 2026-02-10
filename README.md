# Vomo - Volunteer & Event Organizer Tool

## Project Overview

Vomo is a simple, mobile-friendly volunteer and event scheduling tool designed for small nonprofits, schools, and community organizations. The MVP allows event organizers to create events, publish volunteer shifts, allow volunteers to sign up without accounts, and automate shift reminders.

## Features

- Event management with title, description, location, and date
- Shift scheduling with customizable roles and time slots
- Public sign-up links for volunteers (no account required)
- Automated email confirmations and reminders
- Organizer dashboard for managing volunteers and events
- CSV export for volunteer data
- Mobile-first responsive design

## Tech Stack

This project is built with:

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui with Tailwind CSS (Emerald theme)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Email Service:** Resend
- **Forms:** React Hook Form + Zod validation
- **State Management:** TanStack React Query
- **Routing:** React Router DOM
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account and project
- Resend account for email notifications

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd vomo

# Install dependencies
npm install

# Create .env.local file with your credentials
cp .env.example .env.local

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RESEND_API_KEY=your_resend_api_key
```

## Development

```sh
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
vomo/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── forms/       # Form components
│   │   └── public/      # Public-facing components
│   ├── contexts/        # React contexts (Auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Utilities and configurations
│   ├── pages/           # Page components
│   ├── templates/       # Email templates
│   └── App.tsx          # Main app component
├── supabase/
│   └── migrations/      # Database migrations
└── public/              # Static assets
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy

### Supabase Setup

1. Create a Supabase project
2. Run database migrations from `supabase/migrations/`
3. Configure Row Level Security (RLS) policies
4. Set up authentication providers
5. Deploy edge functions for automated reminders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
