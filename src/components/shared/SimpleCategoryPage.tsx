
import React from "react";
import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";

interface SimpleCategoryPageProps {
  title: string;
  description: string;
}

const SimpleCategoryPage: React.FC<SimpleCategoryPageProps> = ({ title, description }) => {
  return (
    <>
      <Helmet>
        <title>{title} - HindPrabhari</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-3xl">{description}</p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground text-lg">
            Content for {title} coming soon...
          </p>
        </div>
      </div>
    </>
  );
};

export default SimpleCategoryPage;
