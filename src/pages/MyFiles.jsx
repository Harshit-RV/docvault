import { useState } from "react"
import FileUpload from "@/components/FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyFiles() {
  const [ activeTab, setActiveTab ] =  useState("tab1");
  const [popup, setPopup] = useState(false);
  const [popupTab, setPopupTab] = useState("requestNewFile");
  const handlePopupTabChange = (tabName) => {
    setPopupTab(tabName);
  };
  const handlePopup = () => {
    setPopup(!popup);
  };
  const handleTabChange =(tabName)=>{
    setActiveTab(tabName);
}
const handleFileChange = (event) => {
      const file = event.target.files[0]; // Assuming only one file is selected
  
  if (file) {
    // Check file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
      return;
    }

    // Check file size (50KB)
    const maxSizeInBytes = 50 * 1024; // 50KB
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 50KB.");
      return;
    }

    console.log("File is valid", file);
  }
};

  return (
    <div className="bg-[#0D111D] h-screen px-12">
        <div className="flex justify-between pt-12 pl-14 pr-14 items-center mb-4">
            <h1 className="text-white font-bold text-3xl">My Files</h1>
            <ToastContainer />
            <button 
              onClick={handlePopup}
              className='mt-8 bg-[#27E8A7] w-auto text-black font-bold py-2 px-6 rounded-md hover:bg-[#20C08F] transition-colors'>
              New File
            </button>
            {popup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-100 p-6 w-96 rounded-lg">
              <div className="flex mb-8 gap-2">
                <button
                  className={`w-1/2 py-2 rounded-md ${
                    popupTab === "requestNewFile"
                      ? "bg-[#27E8A7] text-black font-medium text-[15px]"
                      : "bg-gray-200 font-medium text-[15px]"
                  }`}
                  onClick={() => handlePopupTabChange("requestNewFile")}
                >
                  Request New File
                </button>
                <button
                  className={`w-1/2 py-2 rounded-md ${
                    popupTab === "requestVerification"
                      ? "bg-[#27E8A7] text-black font-medium text-[15px]"
                      : "bg-gray-200 font-medium text-[15px]"
                  }`}
                  onClick={() => handlePopupTabChange("requestVerification")}
                >
                  Request Verification
                </button>
              </div>

              {popupTab === "requestNewFile" && (
                <form>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold">Document Type</label>
                    <select className="w-full border border-gray-300 p-2 mt-2 rounded">
                      <option value="">Select Document</option>
                      <option value="document1">Bonafide Certificate</option>
                      <option value="document2">Merit Award Certificate</option>
                      <option value="document2">Medical Certificate</option>
                      <option value="document2">School leaving Certificate</option>
                      <option value="document2">Letter of Recommendation</option>
                      <option value="document2">Appointment letter</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Organization</label>
                    <select className="w-full border border-gray-300 p-2 mt-2 rounded">
                      <option value="">Select Organization</option>
                      <option value="org1">Directorate of Education</option>
                      <option value="org2">Netaji Subhas University of Technology</option>
                      <option value="org2">Salesforce</option>
                    </select>
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
                      className="bg-[#402530] text-white px-4 py-2 rounded"
                    >
                      Request
                    </button>
                  </div>
                </form>
              )}

              {popupTab === "requestVerification" && (
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Organization</label>
                    <select className="w-full border border-gray-300 p-2 mt-2 rounded">
                      <option value="">Select Organization</option>
                      {/* Add more options as needed */}
                      <option value="org1">Organization 1</option>
                      <option value="org2">Organization 2</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Upload File</label>
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
                      className="bg-[#402530] text-white px-4 py-2 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        {/* <ToastContainer /> */}
        </div>
        <div className='flex gap-4 bg-[#1C1F2E] w-72 rounded-lg p-2 ml-14'>
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

export default MyFiles
