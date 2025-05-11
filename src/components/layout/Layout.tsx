
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NewsTicker from "../news/NewsTicker";
import ChatBubble from "../ai/ChatBubble";

const Layout = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header />
      <div className="pt-16">
        <div className="surface-container-low py-1">
          <NewsTicker className="my-3 md-elevation-1" />
        </div>
        <main className="flex-grow animate-in">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Layout;
