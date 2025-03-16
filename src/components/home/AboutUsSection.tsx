
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutUsSection = () => {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">About Us</h2>
          <Link to="/about" className="flex items-center text-primary hover:underline">
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="relative p-6 bg-background rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                At HindPrabhari, we are committed to delivering unbiased, fact-based journalism that empowers citizens with accurate information. We believe in the power of truth and transparency in shaping a better informed society.
              </p>
            </div>
            
            <div className="relative p-6 bg-background rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To be India's most trusted news source that upholds the highest standards of journalistic integrity while embracing technological innovation to deliver news that matters, when it matters.
              </p>
            </div>
            
            <div className="relative p-6 bg-background rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold mb-3">Our Values</h3>
              <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                <li>Truth and accuracy above all</li>
                <li>Independence from political and corporate influence</li>
                <li>Fairness and impartiality in reporting</li>
                <li>Accountability to our readers and the public</li>
                <li>Service to the national interest and democratic values</li>
              </ul>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-[500px] shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30"></div>
            <img 
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop" 
              alt="Newsroom" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Excellence in Journalism</h3>
              <p className="text-white/90 mb-4">Our team of dedicated journalists work tirelessly to bring you stories that matter.</p>
              <Button asChild>
                <Link to="/about">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
