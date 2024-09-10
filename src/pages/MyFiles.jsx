import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileIcon, MoreVertical, UserIcon, UserPlusIcon, PlusIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Assuming these components exist
import { getAllNFTs } from '../contract/methods';
import { useQuery } from 'react-query';
import { fetchJsonFromIPFS } from "@/utils/fetchJsonFromIpfs";
import React, { useEffect } from 'react';

function extractIpfsHash(ipfsString) {
  // Check if the input is a valid string and starts with "ipfs:/"
  if (typeof ipfsString !== 'string' || !ipfsString.startsWith('ipfs:/')) {
      throw new Error('Invalid IPFS URI format');
  }

  // Extract the hash by removing the "ipfs:/" prefix
  const ipfsHash = ipfsString.replace('ipfs:/', '');
  
  // Return the IPFS hash
  return ipfsHash;
}


function MyFiles() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [popup, setPopup] = useState(false);
  const [popupTab, setPopupTab] = useState("requestNewFile");
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [success, setSuccess] = useState("")


  const [ files, setFiles ] = useState([
    { id: 1, name: 'Example File.pdf', type: 'PDF', size: '2.5 MB', url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 2, name: 'Document.docx', type: 'DOCX', size: '1.8 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
    { id: 3, name: 'Image.jpg', type: 'JPG', size: '3.2 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 4, name: 'Spreadsheet.xlsx', type: 'XLSX', size: '1.1 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 5, name: 'Presentation.pptx', type: 'PPTX', size: '4.7 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
  ]);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleTabChange =(tabName)=>{
    setActiveTab(tabName);
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // Add this line to log the selected file

    setSelectedFile(file);

  if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/pdf"];
      if (!validTypes.includes(file.type)) {
          toast.error("Invalid file type. Only PNG, JPG, JPEG are allowed.");
          return;
      }

      const maxSizeInBytes = 50 * 1024;
      if (file.size > maxSizeInBytes) {
          toast.error("File size less than 50KB.");
          return;
      }

        const formData = new FormData();
        formData.append('image', file);

      try {
          console.log("Uploading file..."); // Add this line to log the upload attempt
          const response = await axios.post('http://localhost:5002/upload', formData);
          const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', formData);


          // Check if 'error' is in the response
          if (response.data.error) {
              toast.error(`Backend Error: ${response.data.error}`);
          } 
          
          else if (response.data.result) {
              // Safely check and use result
              const result = response.data.result;
              if (typeof result === 'string' && result.includes('blurry')) {
                  toast.error('The image is blurry.');
              } else if(typeof result === 'string' && result.includes('rejected')){
                  toast.error('The image did not passes OCR test');
              }
              
      else if (predictionResponse.data.prediction) {
          const prediction = predictionResponse.data.prediction;
          if (prediction === 1) {
            setPredictionResult("Document passed edge detection test.");
            setSuccess("true")
            toast.success("Document passed all tests.");
          } else {
            setPredictionResult("Document did not pass edge detection test.");
            toast.error("Document did not pass edge detection test.");
          }
        }
       } else {
          toast.error('Unexpected response from the prediction server.');
        }

      }
    
      catch (error) {
          toast.error('Error uploading the image.');
          setSuccess("false")
          console.error('Error:', error.response ? error.response.data : error.message); // Log detailed error
      }

      console.log("File is valid", file);
    }
  
  };

  const fetchFiles = async () => {
    const walletAddress = localStorage.getItem('walletAddress');
    const result = await getAllNFTs(walletAddress);
    const tokenPromises = result.map(async (token) => {
        const hash = extractIpfsHash(token.tokenURI)
        const metadata = await fetchMetadataFromIPFS(hash);
        console.log('metadata: ', metadata);
        // return { ...token, metadata };
    });

    const tokensWithMetadata = await Promise.all(tokenPromises);
    // // "ipfs://QmZA6dUoe6CDAbhnxBWJVo79GqscPFxYrbCf3YaVNvDwxv"
    // const res = await fetchMetadataFromIPFS('QmSxWzVwpTsQEDy8KxGXLbJhTf9W81irnaNbgXM4E1TDCp');
    // console.log('all files content: ', res);
    console.log('all files: ', tokensWithMetadata);
    return tokensWithMetadata;
  }

  const fetchMetadataFromIPFS = async (ipfsHash) => {
    try {
      // const metadataUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      const metadataUrl = `https://ipfs.io/ipfs/QmSxWzVwpTsQEDy8KxGXLbJhTf9W81irnaNbgXM4E1TDCp`;
  
      const response = await fetch(metadataUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }
  
      const metadata = await response;
      return metadata;
    } catch (error) {
      console.error('Error fetching metadata from IPFS:', error);
      return null;
    }
  };

  const { data: filesData, isLoading: filesLoading, refetch: filesRefetch } = useQuery('user-orgs2', fetchFiles, { enabled: false });

  useEffect(() => {
    filesRefetch();
  }, []);

  return (
    <div className="bg-[#0D111D] h-full min-h-screen px-12">
      <div className="flex justify-between pt-12 px-4 mb-3 items-center">
        <h1 className="text-white font-bold text-3xl">My Files</h1>
        <ToastContainer />
        <button
          onClick={handlePopup}
          className="bg-[#27E8A7] w-auto text-black font-bold py-2 px-6 rounded-md hover:bg-[#20C08F] transition-colors"
        >
          New File
        </button>
      </div>

      {popup && (
        <Dialog open={popup} onOpenChange={setPopup}>
          <DialogTitle></DialogTitle>
          <DialogContent className="bg-gray-900 border-none text-white py-7 px-8 max-w-[52vh] overflow-auto">
            <div className="flex mb-8 gap-2 h-80">
              <Tabs defaultValue={popupTab}>
                <TabsList className="grid h-min grid-cols-2 mb-[5vh] bg-gray-600 text-white">
                  <TabsTrigger value="requestNewFile" className=" text-sm flex items-center justify-center">
                    Request New File
                  </TabsTrigger>
                  <TabsTrigger value="requestVerification" className=" text-sm flex items-center justify-center">
                    Request Verification
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="requestNewFile">
                  <form>
                    <div className="mb-8 w-[40vh]">
                      <label className="block text-gray-300 font-semibold">Document Type</label>
                      <select className="w-full border border-gray-300 p-2 mt-2 px-2 rounded-md">
                        <option value="">Select Document</option>
                        <option value="document1">Bonafide Certificate</option>
                        <option value="document2">Merit Award Certificate</option>
                      </select>
                    </div>

                    <div className="mb-8">
                      <label className="block text-gray-300 font-semibold">Organization</label>
                      <select className="w-full border border-gray-300 p-2 mt-2 rounded-md">
                        <option value="">Select Organization</option>
                        <option value="org1">Netaji Subhas University of Technology</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="bg-primaryGreen text-black font-medium px-4 py-2 rounded">
                        Request
                      </button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="requestVerification">
                  <form>
                    <div className="mb-4  w-[40vh]">
                      <div className="flex justify-between justify-content items-center">
                      <label className="block text-gray-300 font-semibold">Upload File</label>
                      {
                        success=="true"?
                        <div className="text-green-600">File Uploaded</div>: success==="false"?
                        <div className=" text-red-600"> File Not Uploaded</div>: <div></div>
                                            }</div>
                      <FileUpload type="file" onChange={handleFileChange} />
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="bg-primaryGreen text-black font-medium px-4 py-2 rounded">
                        Submit
                      </button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
);
}


function FileCard({ file, deleteFile }) {
  // const [showOptions, setShowOptions] = useState(false);
  // const [deletePopup, setDeletePopup] = useState(false);

  // const toggleOptions = () => {
  //   setShowOptions(!showOptions);
  // };

  // const handleDelete = () => {
  //   deleteFile(file.id);
  //   setDeletePopup(false); 
  //   setShowOptions(false); 
  // };

  return (
    <div className="relative bg-[#1C1F2E] p-4 rounded-lg text-white">

    <img src={file.url} className="rounded mb-2" />

    <div className="flex justify-between items-start ">
    <h3 className="text-md truncate">{file.name}</h3>
      {/* <MoreVertical className="w-5 h-5 cursor-pointer" onClick={toggleOptions} /> */}
    </div>
      

      {/* {showOptions && (
        <div className="absolute right-4 top-18 z-30 bg-gray-800 text-white rounded-md shadow-lg">
          <button
            className="block px-4 py-2 text-left w-full hover:bg-red-600 hover:rounded-md"
            onClick={() => {setDeletePopup(true),setShowOptions(false)}} 
          >
            Delete
          </button>
        </div>
      )} */}

      {/* {deletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 py-8 px-10 w-96 rounded-lg shadow-lg">
            <h2 className="text-white font-semibold text-lg mb-4">Confirm Delete</h2>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this file?
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setDeletePopup(false)} 
                variant="secondary"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default MyFiles

// App.jsx or any component file
