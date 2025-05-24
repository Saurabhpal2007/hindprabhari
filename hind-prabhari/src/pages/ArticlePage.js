import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleById } from '../mockData/articles';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const ArticlePage = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated, user } = useAuth(); // Get auth state for comment author

  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true);
        const data = await fetchArticleById(articleId);
        if (data) {
          setArticle(data);
          // Mock initial comments for the article (can be fetched later)
          setComments([
            { id: 1, author: "Reader1", text: "Great article, very insightful!", date: "2023-10-27" },
            { id: 2, author: "AnotherReader", text: "Thanks for sharing this.", date: "2023-10-28" },
          ]);
          setError(null);
        } else {
          setArticle(null);
          setComments([]);
          setError('Article not found.');
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError('Failed to load the article. Please try again later.');
        setArticle(null);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      getArticle();
    }
  }, [articleId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === '') {
      return; // Don't add empty comments
    }
    const commentAuthor = isAuthenticated && user ? user.name || user.email : "Guest";
    const newCommentObject = {
      id: comments.length + 1, // Simple ID generation
      author: commentAuthor,
      text: newComment,
      date: new Date().toISOString().split('T')[0], // Current date
    };
    setComments([...comments, newCommentObject]);
    setNewComment(''); // Clear input field
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center text-gray-700 dark:text-gray-300">Loading article...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500 dark:text-red-400">{error}</div>;
  }

  if (!article) {
    return <div className="container mx-auto p-4 text-center text-gray-700 dark:text-gray-300">Article not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8">
        <header className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{article.title}</h1>
          <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-400">
            <p className="mr-4">By <span className="font-semibold text-blue-600 dark:text-blue-400">{article.author || "Unknown Author"}</span></p>
            <p>Published on: <span className="font-semibold">{article.date || "Unknown Date"}</span></p>
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="mt-3">
              {article.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {article.imageUrl && (
          <div className="mb-6">
            <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"/>
          </div>
        )}

        <section className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </section>

        {/* Comments Section */}
        <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Comments ({comments.length})</h2>
          
          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="mb-3">
              <label htmlFor="commentInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Add your comment
              </label>
              <textarea
                id="commentInput"
                value={newComment}
                onChange={handleCommentChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={isAuthenticated ? "Write your comment..." : "Please login to comment."}
                disabled={!isAuthenticated} // Disable if not logged in
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
              disabled={!isAuthenticated || newComment.trim() === ''} // Disable if not logged in or comment is empty
            >
              Add Comment
            </button>
             {!isAuthenticated && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                You must be logged in to post a comment.
              </p>
            )}
          </form>

          {/* Display Comments */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="flex items-center mb-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mr-2">{comment.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to Homepage
          </Link>
          {article.category && (
             <Link to={`/categories?name=${article.category}`} className="ml-4 text-green-600 dark:text-green-400 hover:underline">
                More in {article.category} &rarr;
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
