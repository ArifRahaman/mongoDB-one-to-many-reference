import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import { FaBars, FaTimes, FaSignOutAlt, FaUpload, FaUserPlus, FaSignInAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
    const image = localStorage.getItem("uploadedImageUrl");
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleLogout = () => {
        Cookies.remove('jwt');
        localStorage.clear();
        setAuthUser(null);
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="bg-gray-200 text-white">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 w-32" alt="Flowbite Logo" />
                    </h1>
                </div>
                <nav className="hidden md:flex space-x-4">
                    <Link to="/search" className={`px-3 py-2 rounded ${isActive('/search') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        <div className="mr-2" /> Search
                    </Link>
                    <Link to="/chatbot" className={`px-3 py-2 rounded ${isActive('/chatbot') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        <div className="mr-2" /> Chatbot
                    </Link>
                    {/* <Link to="/dashboard" className={`px-3 py-2 rounded ${isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        <div className="mr-2" /> Profile
                    </Link> */}
                    <Link to="/upload" className={`px-3 py-2 rounded ${isActive('/upload') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        <div className="mr-2" /> Upload
                    </Link>
                    
                    <Link to="/post" className={`px-3 py-2 rounded ${isActive('/post') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        Post
                    </Link>
                    <Link to="/seeposts" className={`px-3 py-2 rounded ${isActive('/seeposts') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                        See Posts
                    </Link>
                    {authUser ? (
                        <>
                            <div className="flex items-center space-x-2">

            
                                <Link to="/dashboard" className={`px-3 py-2 rounded ${isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-100 text-slate-800'}`}>
                                    <div className="mr-2" />                     <img src={image} alt="Profile" className="h-18 w-12 rounded-full" />
                                </Link>
                            </div>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded flex items-center">
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className={`px-3 py-2 rounded ${isActive('/signup') ? 'bg-blue-500' : 'hover:bg-gray-700 text-slate-600'}`}>
                                <FaUserPlus className="mr-2" /> Signup
                            </Link>
                            <Link to="/login" className={`px-3 py-2 rounded ${isActive('/login') ? 'bg-blue-500' : 'hover:bg-gray-700 text-slate-600'}`}>
                                <FaSignInAlt className="mr-2" /> Login
                            </Link>
                        </>
                    )}
                </nav>
                <button onClick={toggleSidebar} className="md:hidden bg-gray-800 text-white px-2 py-1 rounded">
                    {sidebarVisible ? <FaTimes style={{ fontSize: '1rem' }} /> : <FaBars style={{ fontSize: '1rem' }} />}
                </button>
            </div>
            {sidebarVisible && (
                <nav className="md:hidden bg-gradient-to-br from-red-400 to-gray-500 text-white p-4">
                    <ul className="space-y-4">
                        <li>
                            {/* <Link to="/upload" className={`px-3 py-2 rounded block ${isActive('/upload') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                <div className="mr-2" /> Upload
                            </Link> */}
                        </li>
                        <li>
                            <Link to="/post" className={`px-3 py-2 rounded block ${isActive('/post') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                Post
                            </Link>
                        </li>
                        <li>
                            <Link to="/chatbot" className={`px-3 py-2 rounded block ${isActive('/chatbot') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                Chatbot
                            </Link>
                        </li>
                        <li>
                            <Link to="/seeposts" className={`px-3 py-2 rounded block ${isActive('/seeposts') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                See Posts
                            </Link>
                        </li>
                        {authUser ? (
                            <>
                                {/* <li className="flex items-center space-x-2">
                                    <FaUser className="text-slate-800" />
                                    <img src={authUser.profileImageUrl} alt="Profile" className="h-8 w-8 rounded-full" />
                                </li> */}
                                <li>
                                    <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded flex items-center">
                                        <FaSignOutAlt className="mr-2" /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup" className={`px-3 py-2 rounded block ${isActive('/signup') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaUserPlus className="mr-2" /> Signup
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className={`px-3 py-2 rounded block ${isActive('/login') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaSignInAlt className="mr-2" /> Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Navbar;
