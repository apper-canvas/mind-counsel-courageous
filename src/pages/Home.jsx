import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import MainFeature from '../components/MainFeature';

function Home() {
  // Redirect to dashboard
  return <Navigate to="/dashboard" replace />;
}

export default Home;
