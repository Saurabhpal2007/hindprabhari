
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast({
        title: "Newsletter Subscription",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
    }
  };
  
  // Footer sections aligned with our site structure
  const sections = [
    {
      title: "News Categories",
      links: [
        { name: "World", href: "/world" },
        { name: "Politics", href: "/india/politics" },
        { name: "Business", href: "/business" },
        { name: "Technology", href: "/technology" },
        { name: "Sports", href: "/sports" },
        { name: "Science", href: "/science" },
        { name: "Health", href: "/health" }
      ]
    },
    {
      title: "Content Formats",
      links: [
        { name: "Videos", href: "/video" },
        { name: "Audio", href: "/audio" },
        { name: "Photos", href: "/photos" },
        { name: "Data & Graphics", href: "/data" },
        { name: "Opinion", href: "/opinion" },
        { name: "Fact Check", href: "/fact-check" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Latest News", href: "/latest" },
        { name: "Trending Now", href: "/trending" },
        { name: "Investigations", href: "/investigations" },
        { name: "Live Updates", href: "/live" },
        { name: "Special Reports", href: "/special-reports" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Advertise", href: "/advertise" },
        { name: "Editorial Policy", href: "/editorial-policy" },
        { name: "Ethics", href: "/ethics" }
      ]
    }
  ];
  
  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
    { name: "Youtube", icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" }
  ];

  return (
    <footer className="bg-card border-t relative">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Brand section */}
          <div className="md:col-span-3">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <div className="h-12 w-auto mr-2">
                  <img 
                    src="/assets/logo-main.png" 
                    alt="HindPrabhari" 
                    className="h-full w-auto object-contain"
                  />
                </div>
                <span className="text-xl font-semibold">HindPrabhari</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              HindPrabhari is a modern news platform delivering the pulse of Bharat with a focus on accuracy, 
              depth, and cultural relevance across politics, technology, sports, and more.
            </p>
            
            <div className="mb-6 space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2" />
                <span className="text-sm">123 News Street, New Delhi, 110001, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">+91 98765-43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">contact@hindprabhari.com</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted/50 hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors group"
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  <div className="relative">
                    {link.icon}
                    <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 group-hover:blur-md transition-all duration-300"></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation sections */}
          {sections.map((section, index) => (
            <div key={section.title} className={`md:col-span-1 ${index === sections.length - 1 ? 'md:col-span-1' : ''}`}>
              <h3 className="font-semibold mb-4 text-base">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                    >
                      <ChevronRight className="h-3 w-3 mr-1 transition-transform group-hover:translate-x-1" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4 text-base">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm rounded-md border focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
                required
              />
              <Button 
                type="submit" 
                className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-md hover:from-yellow-600 hover:to-orange-600 transition-colors text-sm font-medium"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} HindPrabhari. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies Policy
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Help & FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
