import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../Context/AuthContext'; // Adjust the path to your AuthContext
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import axios from "axios";
import { FaFacebook, FaLinkedin, FaClipboard, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import { BsUpload } from 'react-icons/bs';

const Dashboard = () => {
    const [facebookLink, setFacebookLink] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [leetcodeLink, setLeetcodeLink] = useState("");
    const [customLink, setCustomLink] = useState("");
    const [linkSections, setLinkSections] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const { authUser } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const [uploadedImage, setUploadedImage] = useState("https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.867424154.1713484800&semt=ais"); // State to store uploaded image URL
    const [isEditing, setIsEditing] = useState({
        username: false,
        email: false,
        dob: false,
        universityname: false,
    });
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        dob: '',
        universityname: '',
    });

    // Load initial data from localStorage
    useEffect(() => {
        const storedFacebookLink = localStorage.getItem("facebook");
        const storedLinkedinLink = localStorage.getItem("linkedin");
        const storedLeetcodeLink = localStorage.getItem("leetcode");
        const storedCustomLink = localStorage.getItem("custom");
        const storedLinks = JSON.parse(localStorage.getItem("links"));
        const storedImageUrl = localStorage.getItem('uploadedImageUrl');

        if (storedFacebookLink) setFacebookLink(storedFacebookLink);
        if (storedLinkedinLink) setLinkedinLink(storedLinkedinLink);
        if (storedLeetcodeLink) setLeetcodeLink(storedLeetcodeLink);
        if (storedCustomLink) setCustomLink(storedCustomLink);
        if (storedLinks) setLinkSections(storedLinks);
        if (storedImageUrl) setUploadedImage(storedImageUrl);
    }, []);

    useEffect(() => {
        if (authUser) setUserData(authUser);
    }, [authUser]);

    useEffect(() => {
        console.log('User Data:', userData); // Log the updated userData here
    }, [userData]);

    // Handle form changes and update localStorage
    const handleLinkChange = (e, setLink, key) => {
        const link = e.target.value;
        setLink(link);
        localStorage.setItem(key, link);
    };

    const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
        setEditData({ ...editData, [field]: userData[field] });
    };

    const handleCancel = (field) => {
        setIsEditing({ ...isEditing, [field]: false });
        setEditData({ ...editData, [field]: userData[field] });
    };

    const handleChange = (e, field) => setEditData({ ...editData, [field]: e.target.value });

    const handleSubmit = async (field) => {
        try {
            const res = await fetch(`http://localhost:3001/user/${userData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: editData[field] }),
            });

            const data = await res.json();
            if (!data || res.status !== 200) throw new Error(data?.error || 'Failed to update');

            const updatedUserData = { ...userData, [field]: editData[field] };
            localStorage.setItem('chat-user', JSON.stringify(updatedUserData));

            setUserData(updatedUserData);
            setIsEditing({ ...isEditing, [field]: false });
            toast.success('Successfully updated');
        } catch (error) {
            toast.error(error.message);
        }
    };

    // const handleUpload = async () => {
    //     if (!selectedFile) {
    //         alert('Please select a file to upload.');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('profileImage', selectedFile);

    //     try {
    //         const response = await axios.post('http://localhost:3001/upload-profile-image', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });

    //         if (response.data && response.data.imageUrl) {
    //             setUploadedImage(response.data.imageUrl);
    //             alert('File uploaded successfully!');
    //             localStorage.setItem('uploadedImageUrl', response.data.imageUrl);
    //         } else {
    //             console.error('Invalid server response:', response.data);
    //             alert('Failed to upload file.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //         alert('Failed to upload file.');
    //     }
    // };
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', selectedFile);
        formData.append('email', userData.email); // Include user's email

        try {
            const response = await axios.post('http://localhost:3001/upload-profile-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data && response.data.user) {
                setUploadedImage(response.data.user.profileImage);
                alert('File uploaded successfully!');
                localStorage.setItem('uploadedImageUrl', response.data.user.profileImage);
            } else {
                console.error('Invalid server response:', response.data);
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        }
    };


    const handleSectionChange = (e, id) => {
        const updatedLinks = linkSections.map(section =>
            section.id === id ? { ...section, link: e.target.value } : section
        );
        setLinkSections(updatedLinks);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
    };

    const handleAddSection = () => {
        const newId = linkSections.length > 0 ? linkSections[linkSections.length - 1].id + 1 : 1;
        setLinkSections([...linkSections, { id: newId, link: "", label: "Custom Link" }]);
    };

    const handleRemoveSection = (id) => {
        const updatedLinks = linkSections.filter(section => section.id !== id);
        setLinkSections(updatedLinks);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
    };

    const handleIconClick = (link) => window.open(link, "_blank");

    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 220, friction: 120 },
    });

    const scaleOnHover = {
        whileHover: { scale: 1.1 },
        transition: { duration: 0.3 },
    };

    return (
        <div className="container mx-auto  bg-gradient-to-br from-gray-100 to-blue-100 ">
            <h1 className="text-3xl font-bold mb-8 text-center">User Dashboard</h1>
            <div className="profile-card mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <animated.div style={fadeIn} className="flex flex-col items-center justify-center group">
                    <img
                        src={uploadedImage || 'https://via.placeholder.com/150'}
                        alt="Uploaded Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-transparent transition-transform duration-300 transform group-hover:scale-110"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <BsUpload size={48} className="text-blue-500 hover:text-blue-700 transition-transform duration-300 transform group-hover:scale-110" />
                    </label>
                    <div className="mt-4">
                        {/* <label
                            htmlFor="fileInput"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
                        >
                            Select Image
                        </label> */}

                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                        <button
                            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
                            onClick={handleUpload}
                        >
                            Upload Image
                        </button>
                    </div>
                </animated.div>

                <div className="profile-details w-1/2 mt-6">
                    {userData && (
                        <div className="flex flex-col items-center">
                            {Object.keys(userData).map((key) => (
                                <animated.div key={key} style={fadeIn} className="w-full mb-4 flex items-center justify-between">
                                    <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                                    {isEditing[key] ? (
                                        <div className="flex items-center">
                                            <input
                                                type={key === 'dob' ? 'date' : 'text'}
                                                className="border p-2 rounded mr-2"
                                                value={editData[key]}
                                                onChange={(e) => handleChange(e, key)}
                                            />
                                            <button
                                                className="bg-blue-500 text-white p-2 rounded mr-2"
                                                onClick={() => handleSubmit(key)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-gray-300 text-gray-800 p-2 rounded"
                                                onClick={() => handleCancel(key)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <span>{userData[key]}</span>
                                            <button
                                                className="ml-2 text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEdit(key)}
                                            >
                                                <FaPen />
                                            </button>
                                        </div>
                                    )}
                                </animated.div>
                            ))}
                        </div>
                    )}
                </div>
                <Link to="/changepassword" className="block text-xl text-blue-600 hover:underline">
                    Change password
                </Link>
            </div>

            <div className="mt-8">
                <div className="mb-4 flex items-center">
                    <FaFacebook size={32} className="mr-2 cursor-pointer" onClick={() => handleIconClick(facebookLink)} />
                    <input
                        type="text"
                        value={facebookLink}
                        onChange={(e) => handleLinkChange(e, setFacebookLink, "facebook")}
                        className="border p-2 rounded w-full"
                        placeholder="Enter your Facebook profile link"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <FaLinkedin size={32} className="mr-2 cursor-pointer" onClick={() => handleIconClick(linkedinLink)} />
                    <input
                        type="text"
                        value={linkedinLink}
                        onChange={(e) => handleLinkChange(e, setLinkedinLink, "linkedin")}
                        className="border p-2 rounded w-full"
                        placeholder="Enter your LinkedIn profile link"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <FaClipboard size={32} className="mr-2 cursor-pointer" onClick={() => handleIconClick(leetcodeLink)} />
                    <input
                        type="text"
                        value={leetcodeLink}
                        onChange={(e) => handleLinkChange(e, setLeetcodeLink, "leetcode")}
                        className="border p-2 rounded w-full"
                        placeholder="Enter your LeetCode profile link"
                    />
                </div>
                {linkSections.map((section) => (
                    <div key={section.id} className="mb-4 flex items-center">
                        <FaPlus size={32} className="mr-2 cursor-pointer" onClick={() => handleIconClick(section.link)} />
                        <input
                            type="text"
                            value={section.link}
                            onChange={(e) => handleSectionChange(e, section.id)}
                            className="border p-2 rounded w-full"
                            placeholder="Enter your custom link"
                        />
                        <button onClick={() => handleRemoveSection(section.id)} className="ml-2 text-red-500 hover:text-red-700">
                            <FaTrash />
                        </button>
                    </div>
                ))}
                <button onClick={handleAddSection} className="bg-blue-500 text-white p-2 rounded">
                    Add Custom Link
                </button>
            </div>
        </div>

    );
};

export default Dashboard;