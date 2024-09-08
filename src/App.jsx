import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import MyFiles from './pages/MyFiles';
import VerifyDocs from './pages/VerifyDocs';
import Login from './Login';
import MyOrgs from './pages/MyOrgs';
import Certificate from './pages/Certificate';
import Requests from './pages/Requests';
import OrgPage from './pages/OrgPage';
import Firepage from './pages/Firepage';
import Members from './pages/Members';
import Copy from './copy';
import UploadImage from './pages/UploadImage'
import Header from './pages/Header';
import IpfsHash from './pages/ipfshash'

function App() {
  return (
    <div className='flex flex-col'>
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route path='/' element={<TestPage />} />
          <Route path="/myfiles" element={<MyFiles />} />
          <Route path="/verifydocs" element={<VerifyDocs />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/certificate' element={<Certificate />} />
          <Route path="/myorgs" element={<MyOrgs />} />
          <Route path='/requests' element={<Requests />} />
          <Route path="/org/:orgAddress" element={<OrgPage/>} />
          <Route path='/members' element={<Members />} />
          <Route path='/copy' element={<Copy/>}/>
          <Route path="/uploadImage" element={<UploadImage/>}/>
          <Route path='/ipfshash' element={<IpfsHash/>}/>
          {/* />
        
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/workflow' element={<WorkFlow />} />
          <Route path='/auction' element={<Auction />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/approvals" element={<Approvals />} />
          } */}
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
