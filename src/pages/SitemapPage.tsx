
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", path: "/" },
      { name: "Articles", path: "/articles" },
      { name: "Latest News", path: "/articles" },
      { name: "Trending", path: "/trending" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ]
  },
  {
    title: "Categories",
    links: [
      { name: "Politics", path: "/politics" },
      { name: "Technology", path: "/technology" },
      { name: "Sports", path: "/sports" },
      { name: "Entertainment", path: "/entertainment" },
      { name: "Education", path: "/education" },
      { name: "Health", path: "/health" },
      { name: "World", path: "/world" },
      { name: "Business", path: "/business" },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Cookie Policy", path: "/cookies" },
    ]
  }
];

const SitemapPage = () => {
  useEffect(() => {
    document.title = "Sitemap | HindPrabhari";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Sitemap</h1>
          <Separator className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link 
                        to={link.path}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SitemapPage;
