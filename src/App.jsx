import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import MyFiles from './pages/MyFiles';
import VerifyDocs from './pages/VerifyDocs';
import Login from './Login';
import SignUp from './SignUp';
import MyOrgs from './pages/MyOrgs';
import Certificate from './pages/Certificate';
import Firepage from './pages/Firepage';
import JoinRequests from './pages/JoinRequests';

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestPage />} />
          <Route path="/myfiles" element={<MyFiles />} />
          <Route path="/verifydocs" element={<VerifyDocs />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path="/myorgs" element={<MyOrgs />} />
          <Route path='/test' element={<Firepage />} />
          <Route path='/members' element={<JoinRequests />} />

          
          {/* />
        
          
           {/* <Route path='/signup' element={<Signup />} />
          <Route path='/workflow' element={<WorkFlow />} />
          <Route path='/auction' element={<Auction />} />
          
          
          <Route path="/payments" element={<Payments />} />
          <Route path="/approvals" element={<Approvals />} />
          } */}
        </Routes>
    </BrowserRouter>
  
  )
}

export default App
