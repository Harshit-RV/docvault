import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<TestPage />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
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
