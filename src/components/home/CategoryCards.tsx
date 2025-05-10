
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  path: string;
  color: string;
}

const categories: CategoryCardProps[] = [
  {
    title: "Politics",
    description: "Latest political developments and governance news",
    imageSrc: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    path: "/india/politics",
    color: "bg-blue-600"
  },
  {
    title: "Business",
    description: "Corporate updates, market trends, and economic analysis",
    imageSrc: "https://images.unsplash.com/photo-1444653389962-8149286c578a?w=800&auto=format&fit=crop",
    path: "/business",
    color: "bg-amber-600"
  },
  {
    title: "Technology",
    description: "Latest innovations, digital trends, and tech insights",
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    path: "/technology",
    color: "bg-green-600"
  },
  {
    title: "Health",
    description: "Healthcare advancements, wellness tips, and medical research",
    imageSrc: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop",
    path: "/health",
    color: "bg-red-600"
  },
  {
    title: "Entertainment",
    description: "Film, music, celebrity news, and cultural highlights",
    imageSrc: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop",
    path: "/entertainment",
    color: "bg-purple-600"
  },
  {
    title: "Sports",
    description: "Match results, player updates, and sporting events coverage",
    imageSrc: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop",
    path: "/sports",
    color: "bg-orange-600"
  },
  {
    title: "Science",
    description: "Scientific breakthroughs, research updates, and discoveries",
    imageSrc: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop",
    path: "/science",
    color: "bg-indigo-600"
  },
  {
    title: "Culture",
    description: "Arts, literature, traditions, and cultural explorations",
    imageSrc: "https://images.unsplash.com/photo-1464509896603-ee6bdd5588a3?w=800&auto=format&fit=crop",
    path: "/culture",
    color: "bg-pink-600"
  }
];

const CategoryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          to={category.path}
          key={category.title}
          className="group overflow-hidden rounded-lg shadow-md transition duration-300 hover:shadow-xl relative flex flex-col h-full"
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={category.imageSrc} 
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute top-4 left-4 ${category.color} text-white text-xs font-medium px-2 py-1 rounded`}>
              {category.title}
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow bg-card">
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {category.description}
            </p>
            <div className="mt-auto flex items-center text-primary text-sm font-medium">
              <span>Browse Articles</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
