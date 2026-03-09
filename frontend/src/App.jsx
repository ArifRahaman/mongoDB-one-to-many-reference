import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import SearchPage from './pages/searchpage/SearchPage';

// Lazy load components to improve performance by splitting code
const Signup = lazy(() => import('./pages/signup/Signup'));
const Login = lazy(() => import('./pages/login/Login'));
const Upload = lazy(() => import('./Home'));
const Verifyotp = lazy(() => import('./pages/verify-otp/Verifyotp'));
const Post = lazy(() => import('./components/posts/Post'));
const SeePosts = lazy(() => import('./components/seeposts/SeePosts'));
const Navbar = lazy(() => import("./components/navbar/Navbar"))
const Chatbot = lazy(() => import("./components/chatbot/chatbot"))
const Dashboard = lazy(() => import("./components/userprofile/UserProfile"))
const Search = lazy(() => import("./pages/searchpage/SearchPage"))

function App() {
  // Retrieve authentication context to determine if a user is logged in
  const { authUser } = useAuthContext();
  console.log("authUser in App:", authUser);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Suspense component to show fallback UI while lazy-loaded components are being fetched */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Define routes for different pages and components */}
            <Route path="/signup" element={<Signup />} />
            {/* Redirect to upload page if user is authenticated, otherwise show login page */}
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/upload" />} />
            {/* Redirect to login page if user is not authenticated, otherwise show upload page */}
            <Route path="/upload" element={authUser ? <Upload /> : <Navigate to="/login" />} />
            <Route path="/otp-verification" element={<Verifyotp />} />
            <Route path="/post" element={<Post />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/seeposts" element={<SeePosts />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Redirect to upload page if user is authenticated, otherwise show login page */}
            <Route path="/" element={<Navigate to={authUser ? "/upload" : "/login"} />} />
            {/* Redirect any unknown routes to the root path */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;