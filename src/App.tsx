
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a placeholder component for category pages
const CategoryPage = ({ category }: { category: string }) => (
  <div className="container mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-6">{category}</h1>
    <p className="text-muted-foreground">
      This is the {category.toLowerCase()} category page. Content coming soon.
    </p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Category Routes */}
          <Route path="/politics" element={<CategoryPage category="Politics" />} />
          <Route path="/technology" element={<CategoryPage category="Technology" />} />
          <Route path="/sports" element={<CategoryPage category="Sports" />} />
          <Route path="/entertainment" element={<CategoryPage category="Entertainment" />} />
          <Route path="/education" element={<CategoryPage category="Education" />} />
          <Route path="/health" element={<CategoryPage category="Health" />} />
          <Route path="/world" element={<CategoryPage category="World" />} />
          <Route path="/business" element={<CategoryPage category="Business" />} />
          
          {/* Placeholder routes for other pages */}
          <Route path="/latest" element={<CategoryPage category="Latest News" />} />
          <Route path="/trending" element={<CategoryPage category="Trending Now" />} />
          <Route path="/opinion" element={<CategoryPage category="Opinion" />} />
          <Route path="/explainers" element={<CategoryPage category="Explainers" />} />
          <Route path="/videos" element={<CategoryPage category="Videos" />} />
          
          {/* About, Contact, etc. */}
          <Route path="/about" element={<CategoryPage category="About Us" />} />
          <Route path="/contact" element={<CategoryPage category="Contact" />} />
          <Route path="/careers" element={<CategoryPage category="Careers" />} />
          <Route path="/privacy" element={<CategoryPage category="Privacy Policy" />} />
          <Route path="/terms" element={<CategoryPage category="Terms of Service" />} />
          <Route path="/cookies" element={<CategoryPage category="Cookie Policy" />} />
          <Route path="/sitemap" element={<CategoryPage category="Sitemap" />} />
          
          {/* Placeholder for article pages */}
          <Route path="/article/:id" element={<CategoryPage category="Article" />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
