import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground mb-6">
          Volunteer Management Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Simplify Volunteer
          <br />
          Management
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
          Vomo makes it easy to organize events, coordinate volunteers, and manage shifts
          — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button size="lg" onClick={() => navigate('/login')}>
            Get Started
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('#how-it-works')}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
