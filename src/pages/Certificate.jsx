import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import { pinJsonToIPFS } from '@/utils/uploadJsonToIpfs';

const jsonData = {
	description: "For testing docVault",
	image: "https://media.disneylandparis.com/d4th/en-usd/images/HD13302_2_2050jan01_world_disneyland-park-dlp-website-visual_5-2_tcm1861-248638.jpg?w=1920&f=webp",
	name: "Disney Castle",
	attributes: [
		{ trait_type: "Creator", value: "Starfish" },
		{ trait_type: "Company", value: "Disney" },
		{ trait_type: "Mouth",value: "Surprised" },
	]
};

const CertificateForm = () => {
  const { userAddress, requestId, docType } = useParams();

  const [formData, setFormData] = useState({
    documentType: '',
    organization: '',
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

  const fetchMetadataFromIPFS = async (ipfsHash) => {
    try {
      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      console.log('Fetching metadata from IPFS:', metadataUrl);
  
      // Fetch the metadata JSON directly and parse it
      const response = await fetch(metadataUrl);
      
      // Check if the response is okay, then parse it as JSON
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
  
      const metadata = await response.json();  // This is the parsed JSON
      return metadata;  // Return the parsed JSON metadata
    } catch (error) {
      console.error('Error fetching metadata from IPFS:', error);
      return null;
    }
  };

  const generateImageUsingMetadata = (metadata) => {
    const imageUrl = metadata.image; 
    return imageUrl;
  };

  const handleGenerateAndUpload = async () => {
    try {
      // Fetch metadata from IPFS
      const ipfs = await pinJsonToIPFS(jsonData);
      console.log('IPFS Hash:', ipfs);
      const metadata = await fetchMetadataFromIPFS(ipfs); 
      console.log('Metadata:', metadata);
      // Replace with your actual IPFS hash

      if (metadata) {
        // Generate the image using the metadata
        const generatedImageUrl = generateImageUsingMetadata(metadata);
        setImageUrl(generatedImageUrl);
        console.log('Generated Image URL:', generatedImageUrl);

        // Download the image blob
        const imageBlob = await axios.get(generatedImageUrl, { responseType: 'blob' });

        // Upload the generated image to IPFS
        const fileData = new FormData();
        fileData.append('file', imageBlob.data, 'generatedImage.png');

        const responseData = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: fileData,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
        });

        const imageIpfsUrl = 'https://gateway.pinata.cloud/ipfs/' + responseData.data.IpfsHash;
        setFileUrl(imageIpfsUrl);
        // console.log('Image uploaded to IPFS:', imageIpfsUrl);
        console.log('Image uploaded to IPFS:', imageIpfsUrl);
      }
    } catch (error) {
      console.error('Error generating or uploading image:', error);
    }
  };

  return (
    // <></>
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg mt-10 flex flex-col">
      {requestId}
      {docType}
      {userAddress}
      {/* {!imageUrl && (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center text-primaryGreen">Generate Certificate</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Document Type */}
            <div className="mb-8 w-[40vh]">
              <label className="block text-gray-300 font-semibold">Document Type</label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full border border-gray-600 p-2 mt-2 px-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primaryGreen"
              >
                <option value="">Select Document</option>
                <option value="bonafide">Bonafide Certificate</option>
                <option value="merit-award">Merit Award Certificate</option>
              </select>
            </div>

            {/* Organization */}
            <div className="mb-8">
              <label className="block text-gray-300 font-semibold">Organization</label>
              <select
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full border border-gray-600 p-2 mt-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primaryGreen"
              >
                <option value="">Select Organization</option>
                <option value="nsut">Netaji Subhas University of Technology</option>
                <option value="iitd">Indian Institute of Technology Delhi</option>
              </select>
            </div>

            {/* Additional Form Fields */}
            {Object.keys(formData).map((key) =>
              key !== "documentType" && key !== "organization" ? (
                <div key={key} className="mb-8">
                  <label className="block text-gray-300 font-semibold">
                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full border border-gray-600 p-2 mt-2 px-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                  />
                </div>
              ) : null
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primaryGreen text-black font-medium px-6 py-2 rounded hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
              >
                Generate Certificate
              </button>
            </div>

      {imageUrl && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-10 text-primaryGreen">Generated Certificate</h2>
          <img src={imageUrl} alt="Generated Certificate" className="h-auto mx-auto rounded-lg shadow-lg" />
          <a
            href={downloadUrl}
            download="certificate.png"
            className="bg-primaryGreen text-black font-medium px-4 py-2 rounded inline-block mt-5 hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
          >
            Download Certificate
          </a>
          {fileUrl && (
            <div className="mt-6">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
              >
                View on IPFS
              </a>
            </div>
          )}
        </div>
      )}

      <Button onClick={handleGenerateAndUpload}> json </Button>
    </div>
  );
};

export default CertificateForm;


