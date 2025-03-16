
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer sections
  const sections = [
    {
      title: "Categories",
      links: [
        { name: "Politics", href: "/politics" },
        { name: "Technology", href: "/technology" },
        { name: "Sports", href: "/sports" },
        { name: "Entertainment", href: "/entertainment" },
        { name: "Business", href: "/business" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Latest News", href: "/latest" },
        { name: "Trending Now", href: "/trending" },
        { name: "Opinion", href: "/opinion" },
        { name: "Explainers", href: "/explainers" },
        { name: "Videos", href: "/videos" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  ];
  
  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { name: "Youtube", icon: <Youtube className="h-5 w-5" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "#" }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  HindPrabhari
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 blur-lg -z-10"></div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              HindPrabhari is a modern, AI-driven news platform crafted to deliver a vibrant, user-centric experience with a focus on speed, accessibility, and visual appeal.
            </p>
            
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
          {sections.map((section) => (
            <div key={section.title} className="md:col-span-1">
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
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-sm rounded-md border focus:ring-2 focus:ring-primary focus:outline-none"
                aria-label="Email for newsletter"
                required
              />
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-md hover:from-yellow-600 hover:to-orange-600 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} HindPrabhari. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
            <Link to="/sitemap" className="text-muted-foreground hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
