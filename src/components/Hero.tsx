import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Users, TestTube, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-hero text-white py-20 px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      
      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main heading */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Test Products,
            <br />
            <span className="text-white/90">Build Community</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Join TestCircle's reciprocal testing community. Test others' products monthly, 
            get your own tested, and help build better digital experiences together.
          </p>
        </div>

        {/* Stats cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-48">
            <Users className="h-8 w-8 mx-auto mb-2 text-white/90" />
            <div className="text-2xl font-bold">Active</div>
            <div className="text-white/80">Community</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-48">
            <TestTube className="h-8 w-8 mx-auto mb-2 text-white/90" />
            <div className="text-2xl font-bold">Monthly</div>
            <div className="text-white/80">Testing</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-w-48">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-white/90" />
            <div className="text-2xl font-bold">Quality</div>
            <div className="text-white/80">Feedback</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Join the Waitlist</h3>
          <p className="text-white/80 mb-6">
            Be among the first to experience reciprocal product testing
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Enter your email" 
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 flex-1"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;