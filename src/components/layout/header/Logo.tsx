
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-12 w-auto overflow-hidden">
        <img 
          src="/assets/logo-main.png" 
          alt="HindPrabhari" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
