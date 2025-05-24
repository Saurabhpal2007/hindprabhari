import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { mockArticles } from '../mockData/articles'; // Import mock articles

const SearchPage = () => {
  const location = useLocation();
  const query = location.state?.query || ''; // Get query from navigation state

  // Filter articles based on the query
  const filteredArticles = query ? mockArticles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.content.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-blue-600">{query}</span>
      </h1>

      {filteredArticles.length > 0 ? (
        <div className="space-y-4">
          {filteredArticles.map(article => (
            <div key={article.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/article/${article.id}`} className="text-blue-700 hover:text-blue-900">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-700">{article.content}</p>
              <Link to={`/article/${article.id}`} className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
                Read more &rarr;
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No articles found matching your search query.</p>
      )}
    </div>
  );
};

export default SearchPage;
