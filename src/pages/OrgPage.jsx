import { useState, useEffect } from "react"
import FileUpload from "@/components/FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FileIcon, MoreVertical } from 'lucide-react'
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addNewDocumentRequestMethod, getOrgNameMethod } from "@/contract/vault/methods";
import useWallet from '@/hooks/useWallet';
import { v4 as uuidv4 } from 'uuid';

function OrgPage() {
  const { address } = useWallet(); 

  const [ activeTab, setActiveTab ] =  useState("tab1");
  const [ popup, setPopup ] = useState(false);
  const [ popupTab, setPopupTab ] = useState("requestNewFile");
  const { orgAddress } = useParams();

  const [ orgName, setOrgName ] = useState('');

  const [ documentType, setDocumentType ] = useState("");

  const getNameFromAddress = async () => {
    const name2 = await getOrgNameMethod(address, orgAddress);
    setOrgName(name2);
  }

  useEffect(() => {
    getNameFromAddress();
  },[]);

  const [ files, setFiles ] = useState([
    { id: 1, name: 'Example File.pdf', type: 'PDF', size: '2.5 MB' },
    { id: 2, name: 'Document.docx', type: 'DOCX', size: '1.8 MB' },
    { id: 3, name: 'Image.jpg', type: 'JPG', size: '3.2 MB' },
    { id: 4, name: 'Spreadsheet.xlsx', type: 'XLSX', size: '1.1 MB' },
    { id: 5, name: 'Presentation.pptx', type: 'PPTX', size: '4.7 MB' },
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
    console.log("Document Type", uniqueId);
    await addNewDocumentRequestMethod(address, orgAddress, uniqueId, documentType);
    // TODO: get all files and filter by org name.
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
                <button
                  className={`w-1/2 py-2 rounded-md ${
                    popupTab === "requestNewFile"
                      ? "bg-[#402530] text-white font-medium text-[15px]"
                      : "bg-gray-300 font-medium text-[15px]"
                  }`}
                  onClick={() => handlePopupTabChange("requestNewFile")}
                >
                  Request New File
                </button>
                <button
                  className={`w-1/2 py-2 rounded-md ${
                    popupTab === "requestVerification"
                      ? "bg-[#402530] text-white font-medium text-[15px]"
                      : "bg-gray-300 font-medium text-[15px]"
                  }`}
                  onClick={() => handlePopupTabChange("requestVerification")}
                >
                  Request Verification
                </button>
              </div>
              

              {popupTab === "requestNewFile" && (
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
              )}

              {popupTab === "requestVerification" && (
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
              )}
            </div>
          </div>
        )}
        <div className='flex gap-4 bg-[#1C1F2E] w-72 rounded-lg p-2 ml-14 mb-8'>
            <Tab 
                name="Approved" 
                active={activeTab==="tab1"} 
                onClick={()=>handleTabChange("tab1")} 
            />
            <Tab 
                name="Pending" 
                active={activeTab==="tab2"} 
                onClick={()=>handleTabChange("tab2")} 
            />
        </div>
        <div className="grid grid-cols-4 gap-4 px-14">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}

const Tab =(props)=> {
  const tabClass = props.active ? 'bg-white' : 'bg-gray-500';
  return(
      <div className={`w-36 py-1 text-[15px] font-medium flex items-center justify-center rounded-md cursor-pointer ${tabClass}`} onClick={props.onClick}>
          {props.name}
      </div>

  )
}

function FileCard({ file, deleteFile }) {
    const [showOptions, setShowOptions] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
  
    const toggleOptions = () => {
      setShowOptions(!showOptions);
    };
  
    const handleDelete = () => {
      deleteFile(file.id);
      setDeletePopup(false); 
      setShowOptions(false); 
    };
  
    return (
      <div className="relative bg-[#1C1F2E] p-4 rounded-lg text-white">
        <div className="flex justify-between items-start mb-12">
          <FileIcon className="w-12 h-12 text-[#27E8A7]" />
          <MoreVertical className="w-5 h-5 cursor-pointer" onClick={toggleOptions} />
        </div>
        <h3 className="font-semibold mb-1 truncate">{file.name}</h3>
        <p className="text-sm text-gray-400">{file.type} • {file.size}</p>
  
        {showOptions && (
          <div className="absolute right-4 top-12 bg-gray-800 text-white rounded-md shadow-lg">
            <button
              className="block px-4 py-2 text-left w-full hover:bg-red-600 hover:rounded-md"
              onClick={() => {setDeletePopup(true),setShowOptions(false)}} 
            >
              Delete
            </button>
          </div>
        )}
  
        {deletePopup && (
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
        )}
      </div>
    );
  }
  

export default OrgPage
