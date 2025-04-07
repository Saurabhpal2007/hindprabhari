
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NewsTicker from "../news/NewsTicker";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Only show the news ticker on the homepage
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className={isHomePage ? 'pt-16' : 'pt-16'}>
        {isHomePage && <NewsTicker className="mt-4" />}
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
