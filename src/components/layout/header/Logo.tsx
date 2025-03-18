
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative h-10 w-40 overflow-hidden rounded-xl">
        {/* Banner image */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <span className="text-xl font-bold text-white">HindPrabhari</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
