import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllArticles } from '../mockData/articles'; // Import fetch function

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllArticles();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError('Failed to load articles. Please try again later.');
        setArticles([]); // Clear articles on error
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center text-gray-700 dark:text-gray-300">Loading articles...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500 dark:text-red-400">{error}</div>;
  }

  const featuredArticles = articles.slice(0, 2); // First 2 articles for featured
  const trendingArticles = articles.slice(2, 6); // Next 4 for trending (adjust as needed)
  const latestTechArticle = articles.find(article => article.category === 'Tech'); // Example for category section

  return (
    <div className="container mx-auto p-4">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Increased gap */}
        {/* Featured Section and News Ticker (takes 2/3 width on md screens) */}
        <div className="md:col-span-2 space-y-6"> {/* Increased space */}
          {/* Featured Section */}
          <section className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b-2 border-blue-300 dark:border-blue-600 pb-3">Featured Articles</h2>
            {featuredArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredArticles.map(article => (
                  <div key={article.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                    <img src={article.imageUrl || 'https://via.placeholder.com/600x400/E0F7FA/00796B?text=Article'} alt={article.title} className="w-full h-48 object-cover"/>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">
                        <Link to={`/article/${article.id}`} className="hover:underline">{article.title}</Link>
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{article.content.substring(0, 100)}...</p>
                      <Link to={`/article/${article.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">Read More &rarr;</Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No featured articles available.</p>
            )}
          </section>

          {/* News Ticker - Placeholder, can be replaced with actual ticker component later */}
          <section className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">News Ticker</h3>
            <div className="bg-gray-300 dark:bg-gray-600 h-12 flex items-center justify-center rounded">
              <p className="text-gray-700 dark:text-gray-300">Breaking News: Placeholder Ticker Item 1 | Placeholder Ticker Item 2</p>
            </div>
          </section>
        </div>

        {/* Vertical Trending Section */}
        <aside className="md:col-span-1 bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-300 dark:border-green-600 pb-2 text-gray-800 dark:text-gray-100">Trending</h2>
          {trendingArticles.length > 0 ? (
            <ul className="space-y-4">
              {trendingArticles.map(article => (
                <li key={article.id} className="p-3 bg-white dark:bg-gray-700 rounded-md shadow hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <img src={article.imageUrl || 'https://via.placeholder.com/100x75/E8F5E9/4CAF50?text=Trending'} alt={article.title} className="w-full h-24 object-cover rounded-md mb-2"/>
                  <h4 className="font-semibold text-green-700 dark:text-green-300">
                    <Link to={`/article/${article.id}`} className="hover:underline">{article.title}</Link>
                  </h4>
                   <p className="text-xs text-gray-600 dark:text-gray-400">{article.date} - {article.author}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No trending articles available.</p>
          )}
        </aside>
      </div>

      {/* Category Section */}
      <section className="mt-8 bg-indigo-100 dark:bg-indigo-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Categories</h2>
          <Link to="/categories" className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 font-semibold">More Categories &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Example: Displaying a specific category article or static category links */}
          {latestTechArticle && (
            <div className="bg-indigo-200 dark:bg-indigo-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-200">Latest in Tech</h3>
              <img src={latestTechArticle.imageUrl || 'https://via.placeholder.com/300x200/E8EAF6/3F51B5?text=Tech'} alt={latestTechArticle.title} className="w-full h-32 object-cover rounded-md my-2"/>
              <Link to={`/article/${latestTechArticle.id}`} className="text-indigo-600 dark:text-indigo-300 hover:underline font-medium block mb-1">{latestTechArticle.title}</Link>
              <p className="text-indigo-500 dark:text-indigo-400 text-sm">{latestTechArticle.content.substring(0, 60)}...</p>
            </div>
          )}
          {/* Static Category Links (can be made dynamic later) */}
          <div className="bg-purple-200 dark:bg-purple-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-200">Politics</h3>
            <Link to="/categories?name=Politics" className="text-purple-600 dark:text-purple-300 mt-1 hover:underline">View Articles</Link>
          </div>
           <div className="bg-teal-200 dark:bg-teal-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-200">Business</h3>
            <Link to="/categories?name=Business" className="text-teal-600 dark:text-teal-300 mt-1 hover:underline">View Articles</Link>
          </div>
           <div className="bg-pink-200 dark:bg-pink-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-200">World News</h3>
            <Link to="/categories?name=World" className="text-pink-600 dark:text-pink-300 mt-1 hover:underline">View Articles</Link>
          </div>
        </div>
      </section>

      {/* Contact Us and About Us Sections (remain as placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <section className="bg-yellow-100 dark:bg-yellow-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3 text-yellow-800 dark:text-yellow-200">Contact Us</h2>
          <p className="text-yellow-700 dark:text-yellow-300">Placeholder for contact information or a contact form link.</p>
          <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Get in Touch
          </button>
        </section>
        <section className="bg-purple-100 dark:bg-purple-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3 text-purple-800 dark:text-purple-200">About Us</h2>
          <p className="text-purple-700 dark:text-purple-300">Placeholder for a brief description of Hind Prabhari and a link to the full About Us page.</p>
           <button className="mt-3 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
