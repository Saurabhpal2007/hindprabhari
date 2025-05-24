export const mockArticles = [
  { id: 1, title: "India's Economic Growth: A Deep Dive", content: "Recent trends show a promising outlook for India's economy, with significant growth in key sectors. This article explores the factors driving this growth and potential challenges ahead. We delve into manufacturing, services, and agricultural contributions, providing a comprehensive analysis.", category: "Economy", author: "Priya Sharma", date: "2023-10-15", tags: ["economy", "india", "growth"], imageUrl: "https://via.placeholder.com/600x400/E0F7FA/00796B?text=Economy+Growth" },
  { id: 2, title: "New Tech Gadgets Released This Month", content: "The tech world is buzzing with new releases. From smartphones with foldable screens to AI-powered home assistants, we cover the most exciting gadgets hitting the market. Includes reviews and price points.", category: "Tech", author: "Rajesh Kumar", date: "2023-10-20", tags: ["tech", "gadgets", "innovation"], imageUrl: "https://via.placeholder.com/600x400/E8EAF6/3F51B5?text=New+Gadgets" },
  { id: 3, title: "Global Climate Summit: Key Takeaways", content: "World leaders gathered to discuss urgent climate action. This report summarizes the main agreements, controversies, and future commitments made during the summit. Focus on renewable energy targets and carbon emission reductions.", category: "World", author: "Anita Singh", date: "2023-10-05", tags: ["climate change", "world", "summit"], imageUrl: "https://via.placeholder.com/600x400/E8F5E9/4CAF50?text=Climate+Summit" },
  { id: 4, title: "Advancements in AI: Transforming Industries", content: "Artificial intelligence continues to make significant strides. This piece examines how AI is revolutionizing healthcare, finance, and transportation, along with ethical considerations.", category: "Tech", author: "Vikram Mehta", date: "2023-10-12", tags: ["ai", "technology", "ethics"], imageUrl: "https://via.placeholder.com/600x400/F3E5F5/8E24AA?text=AI+Advancements" },
  { id: 5, title: "Indian Startups on the Rise: Unicorns of Tomorrow?", content: "A comprehensive look at the booming startup ecosystem in India. Highlighting promising ventures in fintech, e-commerce, and SaaS sectors that are poised for significant growth.", category: "India", author: "Sunita Reddy", date: "2023-10-18", tags: ["startups", "india", "business"], imageUrl: "https://via.placeholder.com/600x400/FFF3E0/FF9800?text=Indian+Startups" },
  { id: 6, title: "Political Landscape in Europe: A Shifting Terrain", content: "Analyzing the current political dynamics across key European nations. Discussion on upcoming elections, policy changes, and their potential impact on the European Union.", category: "World", author: "John Doe", date: "2023-10-08", tags: ["europe", "politics", "elections"], imageUrl: "https://via.placeholder.com/600x400/ECEFF1/607D8B?text=European+Politics" },
  { id: 7, title: "The Future of Remote Work: Hybrid Models Emerge", content: "Post-pandemic, the workplace is evolving. This article explores the trends in remote and hybrid work models, their benefits, challenges, and what companies are adopting.", category: "Business", author: "Alice Green", date: "2023-10-22", tags: ["remote work", "business", "future"], imageUrl: "https://via.placeholder.com/600x400/F1F8E9/8BC34A?text=Remote+Work" },
  { id: 8, title: "Space Exploration: Mars Mission Updates", content: "The latest updates from ongoing Mars missions. Discoveries, challenges, and the next steps in humanity's quest to explore the Red Planet.", category: "Science", author: "Chen Zhao", date: "2023-10-10", tags: ["space", "mars", "science"], imageUrl: "https://via.placeholder.com/600x400/FDE0DC/F44336?text=Space+Exploration" },
  { id: 9, title: "Social Media's Impact on Youth Mental Health", content: "An in-depth examination of how social media platforms are affecting the mental well-being of young people. Discusses research findings and potential solutions.", category: "Culture", author: "Dr. Emily Carter", date: "2023-10-14", tags: ["social media", "mental health", "youth"], imageUrl: "https://via.placeholder.com/600x400/E1F5FE/03A9F4?text=Social+Media+Impact" },
  { id: 10, title: "Sustainable Farming in India: A New Revolution", content: "Exploring innovative and sustainable farming practices being adopted across India to ensure food security and environmental protection. Focus on organic farming and water conservation.", category: "India", author: "Aarav Patel", date: "2023-10-02", tags: ["farming", "sustainability", "india"], imageUrl: "https://via.placeholder.com/600x400/D7CCC8/795548?text=Sustainable+Farming" }
];

export const fetchAllArticles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 500); // Simulate 0.5 second delay
  });
};

export const fetchArticleById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articleId = parseInt(id); // Ensure id is a number for comparison
      const article = mockArticles.find(article => article.id === articleId);
      resolve(article || null); // Resolve with null if not found
    }, 300); // Simulate 0.3 second delay
  });
};
