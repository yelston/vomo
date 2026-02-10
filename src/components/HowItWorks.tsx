import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Post Your Project",
    description: "Submit your product for testing with clear requirements and access details. Active members can post monthly.",
    color: "text-primary"
  },
  {
    icon: Search,
    title: "Test Others' Products",
    description: "Browse available projects and provide thoughtful feedback. Test monthly to maintain your active status.",
    color: "text-secondary"
  },
  {
    icon: MessageSquare,
    title: "Receive Quality Feedback",
    description: "Get detailed insights from real users to improve your product. Build lasting community connections.",
    color: "text-accent"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How TestCircle Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple three-step process that creates meaningful testing relationships
            and builds a thriving community of makers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={step.title} className="relative bg-gradient-card shadow-soft hover:shadow-hover transition-all duration-300 border-0">
              <CardContent className="p-8 text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`${step.color} mb-6 flex justify-center`}>
                  <step.icon className="h-12 w-12" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community callout */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-soft">
          <h3 className="text-2xl font-semibold mb-4">Built on Reciprocity</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            TestCircle thrives because everyone contributes. By testing others' products, 
            you earn the right to have your own tested. This creates a self-sustaining 
            community where quality feedback flows both ways.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;