import React, { useState } from 'react';
import axios from 'axios';

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    dateOfIssue: '',
    certificateNumber: '',
    recipientName: '',
    course: '',
    duration: '',
    purpose: '',
    authorizedName: '',
    authorizedDesignation: '',
    signatureDate: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/generate-certificate', formData, {
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
      setDownloadUrl(url); // Set the URL for download
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg mt-10">
      {!imageUrl && (
        <>
      <h1 className="text-2xl font-bold mb-6 text-center">Generate Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex items-center mb-4">
            <label className="w-1/3 font-semibold text-right pr-4">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-primaryBlack text-white p-2 rounded-lg w-full hover:bg-blue-600 transition"
        >
          Generate
        </button>
      </form>
      </>
      )}
      {imageUrl && (
        <div className="mt-6 text-center h-full">
          <h2 className="text-xl font-semibold mb-10">Generated Certificate</h2>
          <img src={imageUrl} alt="Generated Certificate" className="h-auto" />
          <a
            href={downloadUrl}
            download="certificate.png"
            className="bg-green-700 text-white p-2 rounded-lg inline-block hover:bg-green-800 mt-5 transition"
          >
            Download Certificate
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateForm;

