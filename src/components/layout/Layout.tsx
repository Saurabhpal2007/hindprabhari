
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../utils/ScrollToTop";
import ChatBubble from "../ai/ChatBubble";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Layout;
