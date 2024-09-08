import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5002/upload', formData);
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            setResult('Error uploading file.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            <div>{result}</div>
        </div>
    );
};

export default UploadImage;
