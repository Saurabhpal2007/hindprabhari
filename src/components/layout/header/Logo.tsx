
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-8 sm:h-10 w-auto overflow-hidden">
        <img 
          src="/assets/logo-main.png" 
          alt="HindPrabhari" 
          className="h-full w-auto object-contain"
        />
      </div>
      <span className="ml-2 text-lg font-semibold hidden sm:block">HindPrabhari</span>
    </Link>
  );
};

export default Logo;
