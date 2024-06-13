import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    // Function to fetch suggested users
    const fetchSuggestedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/suggestedUsers');
            setSuggestedUsers(response.data);
        } catch (error) {
            console.error('Error fetching suggested users:', error);
        }
    };

    // Fetch suggested users on component mount
    useEffect(() => {
        fetchSuggestedUsers();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div className="container mx-auto bg-gradient-to-br from-gray-100 to-blue-100 p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Search Users</h1>
            <div className="search-box flex justify-center mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by username"
                    className="border p-2 rounded w-1/2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Search
                </button>
            </div>
            {/* Suggested Users Section */}
            <div className="suggested-users mb-8">
                <h2 className="text-xl font-bold mb-4">Suggested Users</h2>
                <div className="flex flex-wrap">
                    {suggestedUsers.map((user) => (
                        <div key={user._id} className="suggested-user-card bg-white p-2 rounded-lg shadow-md mr-4 mb-4 flex items-center">
                            <img
                                src={user.profileImage || 'https://via.placeholder.com/150'}
                                alt={user.username}
                                className="w-12 h-12 rounded-full object-cover mr-2"
                            />
                            <div className="user-info">
                                <h3 className="text-sm font-semibold">{user.username}</h3>
                                <p className="text-xs">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Search Results Section */}
            <div className="search-results">
                {results.map((user) => (
                    <div key={user._id} className="user-card bg-white p-4 rounded-lg shadow-lg mb-4 flex items-center">
                        <img
                            src={user.profileImage || 'https://via.placeholder.com/150'}
                            alt={user.username}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="user-info">
                            <h2 className="text-xl font-bold">{user.username}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
