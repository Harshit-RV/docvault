import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';
import Firepage from './pages/Firepage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestPage />} />
          <Route path='/test' element={<Firepage />} />
           {/* <Route path='/signup' element={<Signup />} />
          <Route path='/workflow' element={<WorkFlow />} />
          <Route path='/auction' element={<Auction />} />
          <Route path="/myworks" element={<Myworks />} />
          <Route path="/mynfts" element={<MyNFTs />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/myworks_admin" element={<Myworks_admin />} /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
