import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedPdfs, setUploadedPdfs] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPdfList = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-pdfs/${userId}`);
        setUploadedPdfs(response.data);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchPdfList();
  }, [userId]);

  const handlePdfUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    if (!userId) {
      setMessage('User not logged in');
      return;
    }

    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:3001/upload-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setUploadedPdfs((prevPdfs) => [...prevPdfs, response.data.pdf]); // Update the list of uploaded PDFs
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('PDF upload failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Upload PDF</h1>
        <form onSubmit={handlePdfUpload}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">PDF:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload PDF
          </button>
        </form>
        {message && <div className="mt-4 text-green-500">{message}</div>}
        <h2 className="text-xl font-bold mt-8">Uploaded PDFs</h2>
        <ul className="mt-4">
          {uploadedPdfs.map((pdf, index) => (
            <li key={index} className="mb-2">
              <a
                href={`http://localhost:3001/${pdf.pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {pdf.pdfPath.split('/').pop()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UploadPdf;
