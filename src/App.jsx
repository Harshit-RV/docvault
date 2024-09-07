import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import MyFiles from './pages/MyFiles';
import VerifyDocs from './pages/VerifyDocs';
import MyOrgs from './pages/MyOrgs';

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestPage />} />
          <Route path="/myfiles" element={<MyFiles />} />
          <Route path="/verifydocs" element={<VerifyDocs />} />
          <Route path="/myorgs" element={<MyOrgs />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
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
