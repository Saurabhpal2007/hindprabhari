
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm p-6 border">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-white',
                footerActionLink: 'text-primary hover:text-primary/90',
              }
            }}
            redirectUrl="/"
          />
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="ghost" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
