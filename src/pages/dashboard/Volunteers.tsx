import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Volunteers() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
        <p className="text-muted-foreground">
          View and manage your volunteers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No volunteers yet</CardTitle>
          <CardDescription>
            Volunteers will appear here once they sign up for your events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Create an event and share the sign-up link to start collecting volunteer signups.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
