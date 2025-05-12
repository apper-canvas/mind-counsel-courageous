import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Icons declaration
  const AlertCircleIcon = getIcon('AlertCircle');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="min-h-screen flex-center bg-surface-50 dark:bg-surface-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-surface-800 rounded-2xl shadow-card p-8 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900 flex-center text-red-600 dark:text-red-300">
          <AlertCircleIcon size={40} />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center w-full py-3 px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          <HomeIcon className="mr-2" size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;