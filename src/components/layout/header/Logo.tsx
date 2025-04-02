
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <motion.div 
        className="relative h-8 sm:h-10 w-auto overflow-hidden"
        whileHover={{ 
          scale: 1.05,
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        <motion.img 
          src="/assets/logo-main.png" 
          alt="HindPrabhari" 
          className="h-full w-auto object-contain"
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -3, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <span className="ml-2 text-lg font-semibold hidden sm:block">HindPrabhari</span>
    </Link>
  );
};

export default Logo;
