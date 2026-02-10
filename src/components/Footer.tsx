import { TestTube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <TestTube className="h-8 w-8" />
            <span className="text-2xl font-bold">TestCircle</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">Community Guidelines</a>
            </nav>
            
            <div className="text-sm text-primary-foreground/70">
              © 2024 TestCircle. Building better products together.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;