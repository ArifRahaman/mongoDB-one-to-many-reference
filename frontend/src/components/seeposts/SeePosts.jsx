import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedPostId, setExpandedPostId] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/posts');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const toggleExpand = (postId) => {
        setExpandedPostId(expandedPostId === postId ? null : postId);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (

        <div className='bg-red-200'>
        <div className="container mx-auto p-4 bg-slate-300">
            <h1 className="text-3xl font-bold mb-6 text-red-600">All Posts</h1>
            {posts.length === 0 ? (
                <div className="text-center text-gray-500">No posts available</div>
            ) : (
                <ul className="space-y-6">
                    {posts.map((post) => (
                        <li
                            key={post._id}
                            className={`p-6 border rounded-lg shadow-lg cursor-pointer transition-transform transform ${expandedPostId === post._id ? 'scale-105' : ''}`}
                            style={{
                                borderColor: expandedPostId === post._id ? '#1e3a8a' : '#e5e7eb',
                                backgroundColor: expandedPostId === post._id ? '#eff6ff' : '#ffffff',
                            }}
                            onClick={() => toggleExpand(post._id)}
                        >
                            <h2 className="text-2xl font-semibold text-red-800">{post.title}</h2>
                            {post.cover && (
                                <img
                                    src={post.cover}
                                    alt={post.title}
                                    className="mt-2 mb-4 w-1/2 h-80 rounded-lg shadow-sm"
                                />
                            )}
                            {expandedPostId === post._id && (
                                <>
                                    <p className="text-gray-700 mb-4">{post.summary}</p>
                                    <div className="prose prose-red max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
};

export default PostsList;
