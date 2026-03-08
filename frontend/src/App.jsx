import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import SearchPage from './pages/searchpage/SearchPage';

// Lazy loading components
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
  const { authUser } = useAuthContext(); // Retrieve authentication context
  console.log("authUser in App:", authUser); // Debugging log

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> // Render the Navbar component
      <div className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}> {/* Display loading message while components are being lazy-loaded */}
          <Routes>
            <Route path="/signup" element={<Signup />} /> // Route for signup page
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/upload" />} /> // Redirect authenticated users from login to upload
            <Route path="/upload" element={authUser ? <Upload /> : <Navigate to="/login" />} /> // Redirect unauthenticated users from upload to login
            <Route path="/otp-verification" element={<Verifyotp />} /> // Route for OTP verification
            <Route path="/post" element={<Post />} /> // Route for post page
            <Route path="/chatbot" element={<Chatbot />} /> // Route for chatbot page
            <Route path="/seeposts" element={<SeePosts />} /> // Route for viewing posts
            <Route path="/search" element={<SearchPage />} /> // Route for search page
            <Route path="/dashboard" element={<Dashboard />} /> // Route for user dashboard
            <Route path="/" element={<Navigate to={authUser ? "/upload" : "/login"} />} /> // Redirect root path based on authentication status
            <Route path="*" element={<Navigate to="/" />} /> {/* Fallback for any undefined route */}
          </Routes>
        </Suspense>
      </div>

    </div>

  );
}

export default App;