
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Separator } from "@/components/ui/separator";

const CookiesPage = () => {
  useEffect(() => {
    document.title = "Cookie Policy | HindPrabhari";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <Separator className="mb-8" />
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your browser by a website you visit. They help that website remember information about your visit, which can both make it easier to visit the site again and make the site more useful to you.
            </p>
            
            <h2>How We Use Cookies</h2>
            <p>
              We use cookies for several purposes, including:
            </p>
            <ul>
              <li><strong>Authentication</strong> - We use cookies to identify you when you visit our website.</li>
              <li><strong>Security</strong> - We use cookies to help identify and prevent security risks.</li>
              <li><strong>Preferences</strong> - We use cookies to remember your settings and preferences.</li>
              <li><strong>Analytics</strong> - We use cookies to help us understand how visitors engage with our website.</li>
            </ul>
            
            <h2>Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential cookies</strong> - These cookies are necessary for the website to function properly.</li>
              <li><strong>Preference cookies</strong> - These cookies remember your preferences.</li>
              <li><strong>Analytics cookies</strong> - These cookies help us understand how visitors interact with our website.</li>
              <li><strong>Marketing cookies</strong> - These cookies track your visit across different websites to help deliver relevant advertising.</li>
            </ul>
            
            <h2>Your Cookie Choices</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
            
            <h2>Changes to Our Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
              cookies@hindprabhari.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPage;
