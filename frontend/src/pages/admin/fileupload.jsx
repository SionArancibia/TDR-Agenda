import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    // Prepare form data to be sent to the server
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make a POST request to upload the file
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Show success message
      alert('File uploaded successfully: ' + response.data.message);
    } catch (error) {
      // Handle errors in file upload
      console.error('Error uploading the file:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleFileUpload} className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
