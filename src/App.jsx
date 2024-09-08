import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import MyFiles from './pages/MyFiles';
import VerifyDocs from './pages/VerifyDocs';
import Login from './Login';
import SignUp from './SignUp';
import MyOrgs from './pages/MyOrgs';
import Certificate from './pages/Certificate';
import Requests from './pages/Requests';
import OrgPage from './pages/OrgPage';
import Firepage from './pages/Firepage';
import Members from './pages/Members';

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
          <Route path='/requests' element={<Requests />} />
          <Route path="/org/:orgName" element={<OrgPage/>} />
          <Route path='/members' element={<Members />} />
        </Routes>
    </BrowserRouter>
  
  )
}

export default App
