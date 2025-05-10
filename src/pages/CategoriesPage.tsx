
import { Helmet } from 'react-helmet-async';
import CategoryCards from '@/components/home/CategoryCards';

const CategoriesPage = () => {
  return (
    <>
      <Helmet>
        <title>News Categories - HindPrabhari</title>
        <meta
          name="description"
          content="Browse all news categories on HindPrabhari - Politics, Business, Technology, Health, Sports, Entertainment, and more."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">News Categories</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore our comprehensive coverage across different domains
        </p>

        <div className="mb-12">
          <CategoryCards />
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
