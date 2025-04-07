
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, YouTube, Mail, Phone, MapPin } from "lucide-react";
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
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Trending", href: "/trending" },
        { name: "India", href: "/india" },
        { name: "World", href: "/world" },
        { name: "Videos", href: "/videos" },
        { name: "Categories", href: "/categories" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Politics", href: "/categories/politics" },
        { name: "Business", href: "/categories/business" },
        { name: "Technology", href: "/categories/technology" },
        { name: "Sport", href: "/categories/sport" },
        { name: "Entertainment", href: "/categories/entertainment" },
        { name: "Science", href: "/categories/science" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Advertise", href: "/advertise" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  ];
  
  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
    { name: "YouTube", icon: <YouTube className="h-5 w-5" />, href: "https://youtube.com" }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center">
                <img 
                  src="/assets/logo-main.png" 
                  alt="HindPrabhari" 
                  className="h-10 w-auto mr-2"
                />
                <span className="text-xl font-bold">HindPrabhari</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6">
              Your trusted source for news from India and around the world.
              Unbiased, accurate, and timely reporting on politics, business, technology, and more.
            </p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-2" />
                <span className="text-sm">123 Media Street, New Delhi, 110001, India</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">+91 98765-43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">contact@hindprabhari.in</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted/50 hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Sections */}
          {sections.map((section) => (
            <div key={section.title} className="md:col-span-1 lg:col-span-1">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="w-full"
                variant="filled"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} HindPrabhari. All Rights Reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
