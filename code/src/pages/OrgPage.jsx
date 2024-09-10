/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import FileUpload from "@/components/FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileIcon, MoreVertical } from 'lucide-react'
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getOrgNameMethod } from "@/contract/vault/methods";
import { addNewDocumentRequestSendMethod } from "@/contract/vault/methods2";
import useWallet from '@/hooks/useWallet';
import { v4 as uuidv4 } from 'uuid';

function OrgPage() {
  const { address, signer } = useWallet(); 

  const [ activeTab, setActiveTab ] =  useState("tab1");
  const [ popup, setPopup ] = useState(false);
  const [ popupTab, setPopupTab ] = useState("requestNewFile");
  const { orgAddress } = useParams();

  const [ orgName, setOrgName ] = useState('');

  const [ documentType, setDocumentType ] = useState("");

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const getNameFromAddress = async () => {
    const name2 = await getOrgNameMethod(address, orgAddress);
    setOrgName(name2);
  }

  useEffect(() => {
    getNameFromAddress();
  },[]);

  const [ files, setFiles ] = useState([
    { id: 1, name: 'Example File.pdf', type: 'PDF', size: '2.5 MB', url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 2, name: 'Document.docx', type: 'DOCX', size: '1.8 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
    { id: 3, name: 'Image.jpg', type: 'JPG', size: '3.2 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 4, name: 'Spreadsheet.xlsx', type: 'XLSX', size: '1.1 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { id: 5, name: 'Presentation.pptx', type: 'PPTX', size: '4.7 MB',  url:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'},
  ]);

  const handlePopupTabChange = (tabName) => {
    setPopupTab(tabName);
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleTabChange =(tabName)=>{
    setActiveTab(tabName);
  }

  const onSubmitRequestVerification = () => {
    // TODO: get all files and filter by org name.
  }

  const onNewDocumentRequest = async () => {
    const uniqueId = uuidv4();
    await toast.promise(
      addNewDocumentRequestSendMethod(signer, orgAddress, uniqueId, title, description, '', documentType),
      {
        pending: 'Adding new document request..',
        success: 'Request added',
      }
    )
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
        return;
      }

      const maxSizeInBytes = 50 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error("File size exceeds 50KB.");
        return;
      }

      console.log("File is valid", file);
    }
  };

  return (
    <div className="bg-gray-900 h-screen px-12">
        <div className="flex justify-between pt-12 pl-14 pr-14 items-center mb-4">
            <h1 className="text-white font-bold text-3xl">Welcome to {orgName}</h1>
            <ToastContainer />
            <button 
              onClick={handlePopup}
              className='mt-8 bg-[#27E8A7] w-auto text-black font-bold py-2 px-6 rounded-md hover:bg-[#20C08F] transition-colors'>
              New File
            </button>
        </div>
            {popup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-6 w-96 rounded-lg">
              <div className="flex mb-8 gap-2">
                <Tabs defaultValue="new" className="w-full">
                  <div className="flex justify-start mb-8">
                    <TabsList className="grid w-full h-min grid-cols-2 bg-gray-800 text-white">
                      <TabsTrigger value="new" className="py-1.5 text-sm flex items-center justify-center">
                        Members
                      </TabsTrigger>
                      <TabsTrigger value="verify" className="py-1.5 text-sm flex items-center justify-center">
                        Requests
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="new">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Title" 
                          className="rounded-lg w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-primaryColor" 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <input 
                          type="text" 
                          placeholder="Description" 
                          className="rounded-lg w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-primaryColor" 
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <Select value={documentType} onValueChange={setDocumentType}>
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Doc Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BONAFIDE">Bonafide Certificate</SelectItem>
                            <SelectItem value="MERIT">Merit Award Certificate</SelectItem>
                            <SelectItem value="MEDICAL">Medical Certificate</SelectItem>
                            <SelectItem value="SCHOOL">School leaving Certificate</SelectItem>
                            <SelectItem value="LOR">Letter of Recommendation</SelectItem>
                            <SelectItem value="APPOINTMENT">Appointment letter</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex justify-end mt-8">
                          <button
                            type="button"
                            className="bg-black text-white px-4 py-2 rounded mr-2"
                            onClick={handlePopup}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={onNewDocumentRequest}
                            className="bg-primaryGreen text-black font-medium px-4 py-2 rounded"
                          >
                            Request
                          </button>
                        </div>
                      </div>
                  </TabsContent>
                  <TabsContent value="verify">
                      <div>
                        <Select value={documentType} onValueChange={setDocumentType}>
                          <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Select Doc Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BONAFIDE">Bonafide Certificate</SelectItem>
                            <SelectItem value="MERIT">Merit Award Certificate</SelectItem>
                            <SelectItem value="MEDICAL">Medical Certificate</SelectItem>
                            <SelectItem value="SCHOOL">School leaving Certificate</SelectItem>
                            <SelectItem value="LOR">Letter of Recommendation</SelectItem>
                            <SelectItem value="APPOINTMENT">Appointment letter</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="mb-4 mt-5">
                          <FileUpload onChange={handleFileChange} />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-black text-white px-4 py-2 rounded mr-2"
                            onClick={handlePopup}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-primaryGreen text-black font-medium px-4 py-2 rounded"
                            onClick={onSubmitRequestVerification}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 px-14">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}

function FileCard({ url, name }) {
    return (
      <div className="relative bg-[#1C1F2E] p-4 rounded-lg text-white">
       
        <img src={url} className="rounded mb-2" />

        <div className="flex justify-between items-start ">
        <h3 className="font-semibold  truncate">{name}</h3>
        </div>

        {/* <p className="text-sm text-gray-400">{file.type} • {file.size}</p> */}
      </div>
    );
  }
  

export default OrgPage
