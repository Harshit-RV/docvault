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
  const [fileUrl, setFileUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Generate the certificate
      const response = await axios.post('http://localhost:5001/generate-certificate', formData, {
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
      setDownloadUrl(url);
      console.log(url)

      // Step 2: Upload the certificate to IPFS using Pinata
      const fileData = new FormData();
      fileData.append('file', response.data); // Append the blob generated to the form data

      const responseData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
      });

      const fileUrl = 'https://gateway.pinata.cloud/ipfs/' + responseData.data.IpfsHash;
      setFileUrl(fileUrl); // Set the IPFS file URL

    } catch (error) {
      console.error('Error generating or uploading certificate:', error);
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
          {fileUrl && (
            <div className="mt-6">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-2 rounded-lg inline-block hover:bg-blue-700">
                Check the IPFS URL
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateForm;

