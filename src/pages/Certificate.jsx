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

      // Step 2: Upload the certificate to IPFS using Pinata
      const fileData = new FormData();
      fileData.append('file', response.data);

      const responseData = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
      });

      const fileUrl = 'https://gateway.pinata.cloud/ipfs/' + responseData.data.IpfsHash;
      setFileUrl(fileUrl);

    } catch (error) {
      console.error('Error generating or uploading certificate:', error);
    }
  };

  return (
    <></>
  );
};

export default CertificateForm;



