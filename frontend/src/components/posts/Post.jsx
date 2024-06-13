// // // // import React, { useState } from 'react';
// // // // import ReactQuill from 'react-quill';
// // // // import 'react-quill/dist/quill.snow.css';
// // // // import axios from 'axios';

// // // // const CreatePost = () => {
// // // //     const [title, setTitle] = useState('');
// // // //     const [summary, setSummary] = useState('');
// // // //     const [content, setContent] = useState('');
// // // //     const [cover, setCover] = useState('');

// // // //     const handleSubmit = async (e) => {
// // // //         e.preventDefault();
// // // //         try {
// // // //             const response = await axios.post('http://localhost:3001/posts', { title, summary, content, cover });
// // // //             console.log(response.data);
// // // //             // Handle success (e.g., redirect to the post list or show a success message)
// // // //         } catch (error) {
// // // //             console.error('There was an error creating the post!', error);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <form onSubmit={handleSubmit}>
// // // //             <input
// // // //                 type="text"
// // // //                 placeholder="Title"
// // // //                 value={title}
// // // //                 onChange={(e) => setTitle(e.target.value)}
// // // //             />
// // // //             <input
// // // //                 type="text"
// // // //                 placeholder="Summary"
// // // //                 value={summary}
// // // //                 onChange={(e) => setSummary(e.target.value)}
// // // //             />
// // // //             <ReactQuill
// // // //                 theme="snow"
// // // //                 value={content}
// // // //                 onChange={setContent}
// // // //             />
// // // //             <input
// // // //                 type="text"
// // // //                 placeholder="Cover Image URL"
// // // //                 value={cover}
// // // //                 onChange={(e) => setCover(e.target.value)}
// // // //             />
// // // //             <button type="submit">Create Post</button>
// // // //         </form>
// // // //     );
// // // // };

// // // // export default CreatePost;


// // // import React, { useState } from 'react';
// // // import ReactQuill from 'react-quill';
// // // import 'react-quill/dist/quill.snow.css';
// // // import axios from 'axios';

// // // const CreatePost = () => {
// // //     const [title, setTitle] = useState('');
// // //     const [summary, setSummary] = useState('');
// // //     const [content, setContent] = useState('');
// // //     const [cover, setCover] = useState('');

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         try {
// // //             const response = await axios.post('http://localhost:3001/posts', { title, summary, content, cover });
// // //             console.log(response.data);
// // //             // Handle success (e.g., redirect to the post list or show a success message)
// // //         } catch (error) {
// // //             console.error('There was an error creating the post!', error);
// // //         }
// // //     };

// // //     return (
// // //         <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
// // //             <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
// // //             <form onSubmit={handleSubmit}>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
// // //                     <input
// // //                         type="text"
// // //                         id="title"
// // //                         placeholder="Title"
// // //                         value={title}
// // //                         onChange={(e) => setTitle(e.target.value)}
// // //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="summary">Summary</label>
// // //                     <input
// // //                         type="text"
// // //                         id="summary"
// // //                         placeholder="Summary"
// // //                         value={summary}
// // //                         onChange={(e) => setSummary(e.target.value)}
// // //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="content">Content</label>
// // //                     <ReactQuill
// // //                         theme="snow"
// // //                         value={content}
// // //                         onChange={setContent}
// // //                         className="bg-white"
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="cover">Cover Image URL</label>
// // //                     <input
// // //                         type="text"
// // //                         id="cover"
// // //                         placeholder="Cover Image URL"
// // //                         value={cover}
// // //                         onChange={(e) => setCover(e.target.value)}
// // //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// // //                     />
// // //                 </div>
// // //                 <div className="text-center">
// // //                     <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
// // //                         Create Post
// // //                     </button>
// // //                 </div>
// // //             </form>
// // //         </div>
// // //     );
// // // };

// // // export default CreatePost;

// // import React, { useState } from 'react';
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css';
// // import axios from 'axios';

// // const CreatePost = () => {
// //     const [title, setTitle] = useState('');
// //     const [summary, setSummary] = useState('');
// //     const [content, setContent] = useState('');
// //     const [cover, setCover] = useState(null);

// //     const handleFileChange = (e) => {
// //         setCover(e.target.files[0]);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         const formData = new FormData();
// //         formData.append('title', title);
// //         formData.append('summary', summary);
// //         formData.append('content', content);
// //         if (cover) {
// //             formData.append('cover', cover);
// //         }

// //         try {
// //             const response = await axios.post('http://localhost:3001/posts', formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                 },
// //             });
// //             console.log(response.data);
// //             // Handle success (e.g., redirect to the post list or show a success message)
// //         } catch (error) {
// //             console.error('There was an error creating the post!', error);
// //         }
// //     };

// //     return (
// //         <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
// //             <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
// //             <form onSubmit={handleSubmit}>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
// //                     <input
// //                         type="text"
// //                         id="title"
// //                         placeholder="Title"
// //                         value={title}
// //                         onChange={(e) => setTitle(e.target.value)}
// //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="summary">Summary</label>
// //                     <input
// //                         type="text"
// //                         id="summary"
// //                         placeholder="Summary"
// //                         value={summary}
// //                         onChange={(e) => setSummary(e.target.value)}
// //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="content">Content</label>
// //                     <ReactQuill
// //                         theme="snow"
// //                         value={content}
// //                         onChange={setContent}
// //                         className="bg-white"
// //                     />
// //                 </div>
// //                 <div className="mb-4">
// //                     <label className="block text-gray-700 font-bold mb-2" htmlFor="cover">Cover Image</label>
// //                     <input
// //                         type="file"
// //                         id="cover"
// //                         onChange={handleFileChange}
// //                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     />
// //                 </div>
// //                 <div className="text-center">
// //                     <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
// //                         Create Post
// //                     </button>
// //                 </div>
// //             </form>
// //         </div>
// //     );
// // };

// // export default CreatePost;
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';

// const CreatePost = () => {
//     const [title, setTitle] = useState('');
//     const [summary, setSummary] = useState('');
//     const [content, setContent] = useState('');
//     const [cover, setCover] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('summary', summary);
//         formData.append('content', content);
//         if (cover) {
//             formData.append('cover', cover);
//         }

//         try {
//             const response = await axios.post('http://localhost:3001/posts', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log(response.data);
//             // Handle success (e.g., redirect to the post list or show a success message)
//         } catch (error) {
//             console.error('There was an error creating the post!', error);
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-bold mb-2" htmlFor="summary">Summary</label>
//                     <input
//                         type="text"
//                         id="summary"
//                         placeholder="Summary"
//                         value={summary}
//                         onChange={(e) => setSummary(e.target.value)}
//                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-black font-bold mb-2" htmlFor="content">Content</label>
//                     <ReactQuill
//                         theme="snow"
//                         value={content}
//                         onChange={setContent}
//                         className="bg-white"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-bold mb-2" htmlFor="cover">Cover Image</label>
//                     <input
//                         type="file"
//                         id="cover"
//                         onChange={(e) => setCover(e.target.files[0])}
//                         className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                 </div>
//                 <div className="text-center">
//                     <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
//                         Create Post
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreatePost;


import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await axios.post('http://localhost:3001/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Handle success (e.g., redirect to the post list or show a success message)
        } catch (error) {
            console.error('There was an error creating the post!', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="summary">Summary</label>
                    <input
                        type="text"
                        id="summary"
                        placeholder="Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="content">Content</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="bg-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="cover">Cover Image</label>
                    <input
                        type="file"
                        id="cover"
                        onChange={(e) => setCover(e.target.files[0])}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;



