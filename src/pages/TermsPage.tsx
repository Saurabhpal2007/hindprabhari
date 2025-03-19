
import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  useEffect(() => {
    document.title = "Terms of Service | HindPrabhari";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <Separator className="mb-8" />
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using HindPrabhari ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on HindPrabhari's website for personal, non-commercial transitory viewing only.
            </p>
            
            <h2>3. User Content</h2>
            <p>
              Users may post content as long as it isn't illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.
            </p>
            
            <h2>4. Disclaimer</h2>
            <p>
              The materials on HindPrabhari's website are provided on an 'as is' basis. HindPrabhari makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2>5. Limitations</h2>
            <p>
              In no event shall HindPrabhari or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HindPrabhari's website.
            </p>
            
            <h2>6. Accuracy of Materials</h2>
            <p>
              The materials appearing on HindPrabhari's website could include technical, typographical, or photographic errors. HindPrabhari does not warrant that any of the materials on its website are accurate, complete or current.
            </p>
            
            <h2>7. Links</h2>
            <p>
              HindPrabhari has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HindPrabhari of the site.
            </p>
            
            <h2>8. Modifications</h2>
            <p>
              HindPrabhari may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2>9. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              terms@hindprabhari.com
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
