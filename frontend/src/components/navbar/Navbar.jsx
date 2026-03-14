import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';
import Cookies from 'js-cookie';
import { FaBars, FaTimes, FaSignOutAlt, FaUpload, FaUserPlus, FaSignInAlt, FaUser } from 'react-icons/fa';

const LOCAL_STORAGE_IMAGE_KEY = "uploadedImageUrl";
const COOKIE_JWT_KEY = 'jwt';
const LOGIN_PATH = '/login';
const BLUE_BACKGROUND = 'bg-blue-500';
const GRAY_HOVER_BACKGROUND = 'hover:bg-gray-100';
const GRAY_HOVER_BACKGROUND_MOBILE = 'hover:bg-gray-700';
const TEXT_SLATE_800 = 'text-slate-800';
const TEXT_SLATE_600 = 'text-slate-600';

const Navbar = () => {
    let image;
    try {
        image = localStorage.getItem(LOCAL_STORAGE_IMAGE_KEY);
    } catch (error) {
        console.error("Error accessing localStorage:", error);
    }

    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const logoutUser = () => {
        try {
            Cookies.remove(COOKIE_JWT_KEY);
        } catch (error) {
            console.error("Error removing cookie:", error);
        }
        localStorage.clear();
        setAuthUser(null);
        navigate(LOGIN_PATH);
    };

    const toggleSidebarVisibility = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    const renderLinks = () => (
        <>
            <Link to="/search" className={`px-3 py-2 rounded ${isActivePath('/search') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                <div className="mr-2" /> Search
            </Link>
            <Link to="/chatbot" className={`px-3 py-2 rounded ${isActivePath('/chatbot') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                <div className="mr-2" /> Chatbot
            </Link>
            <Link to="/upload" className={`px-3 py-2 rounded ${isActivePath('/upload') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                <div className="mr-2" /> Upload
            </Link>
            <Link to="/post" className={`px-3 py-2 rounded ${isActivePath('/post') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                Post
            </Link>
            <Link to="/seeposts" className={`px-3 py-2 rounded ${isActivePath('/seeposts') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                See Posts
            </Link>
        </>
    );

    const renderAuthLinks = () => (
        authUser ? (
            <>
                <div className="flex items-center space-x-2">
                    <Link to="/dashboard" className={`px-3 py-2 rounded ${isActivePath('/dashboard') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND} ${TEXT_SLATE_800}`}`}>
                        <div className="mr-2" />
                        <img src={image} alt="Profile" className="h-18 w-12 rounded-full" />
                    </Link>
                </div>
                <button onClick={logoutUser} className="bg-red-500 px-3 py-2 rounded flex items-center">
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </>
        ) : (
            <>
                <Link to="/signup" className={`px-3 py-2 rounded ${isActivePath('/signup') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND_MOBILE} ${TEXT_SLATE_600}`}`}>
                    <FaUserPlus className="mr-2" /> Signup
                </Link>
                <Link to="/login" className={`px-3 py-2 rounded ${isActivePath('/login') ? BLUE_BACKGROUND : `${GRAY_HOVER_BACKGROUND_MOBILE} ${TEXT_SLATE_600}`}`}>
                    <FaSignInAlt className="mr-2" /> Login
                </Link>
            </>
        )
    );

    const renderMobileLinks = () => (
        <ul className="space-y-4">
            <li>
                <Link to="/post" className={`px-3 py-2 rounded block ${isActivePath('/post') ? BLUE_BACKGROUND : GRAY_HOVER_BACKGROUND_MOBILE}`}>
                    Post
                </Link>
            </li>
            <li>
                <Link to="/chatbot" className={`px-3 py-2 rounded block ${isActivePath('/chatbot') ? BLUE_BACKGROUND : GRAY_HOVER_BACKGROUND_MOBILE}`}>
                    Chatbot
                </Link>
            </li>
            <li>
                <Link to="/seeposts" className={`px-3 py-2 rounded block ${isActivePath('/seeposts') ? BLUE_BACKGROUND : GRAY_HOVER_BACKGROUND_MOBILE}`}>
                    See Posts
                </Link>
            </li>
            {authUser ? (
                <li>
                    <button onClick={logoutUser} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded flex items-center">
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </li>
            ) : (
                <>
                    <li>
                        <Link to="/signup" className={`px-3 py-2 rounded block ${isActivePath('/signup') ? BLUE_BACKGROUND : GRAY_HOVER_BACKGROUND_MOBILE}`}>
                            <FaUserPlus className="mr-2" /> Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className={`px-3 py-2 rounded block ${isActivePath('/login') ? BLUE_BACKGROUND : GRAY_HOVER_BACKGROUND_MOBILE}`}>
                            <FaSignInAlt className="mr-2" /> Login
                        </Link>
                    </li>
                </>
            )}
        </ul>
    );

    return (
        <header className="bg-gray-200 text-white">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 w-32" alt="Flowbite Logo" />
                    </h1>
                </div>
                <nav className="hidden md:flex space-x-4">
                    {renderLinks()}
                    {renderAuthLinks()}
                </nav>
                <button onClick={toggleSidebarVisibility} className="md:hidden bg-gray-800 text-white px-2 py-1 rounded">
                    {sidebarVisible ? <FaTimes style={{ fontSize: '1rem' }} /> : <FaBars style={{ fontSize: '1rem' }} />}
                </button>
            </div>
            {sidebarVisible && (
                <nav className="md:hidden bg-gradient-to-br from-red-400 to-gray-500 text-white p-4">
                    {renderMobileLinks()}
                </nav>
            )}
        </header>
    );
};

export default Navbar;