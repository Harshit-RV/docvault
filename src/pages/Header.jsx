import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import './header.css';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('role')); // Initialize userRole from localStorage using 'role' key
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const handleStorageChange = () => {
      const role = localStorage.getItem('role');
      setUserRole(role);
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setToggleMenu(false);
      setIsClosing(false);
    }, 300);
  };

  // Helper function to check if the current route matches the given path
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  // Menu items based on userRole
  const renderMenuItems = () => {
    switch (userRole) {
      case 'staff':
        return (
          <>
            <div className={`hover:cursor-pointer ${isActive('/')}`} onClick={() => navigate('/')}>My Orders</div>
            <div className={`hover:cursor-pointer ${isActive('/workflow')}`} onClick={() => navigate('/workflow')}>Work Status</div>
          </>
        );
      case 'admin':
        return (
          <>
            <div className={`hover:cursor-pointer ${isActive('/approvals')}`} onClick={() => navigate('/approvals')}>Verify Work</div>
            <div className={`hover:cursor-pointer ${isActive('/myworks_admin')}`} onClick={() => navigate('/myworks_admin')}>History</div>
            <div className={`hover:cursor-pointer ${isActive('/payments')}`} onClick={() => navigate('/payments')}>Issue Certificate</div>
          </>
        );
      case 'contractor':
        return (
          <>
            <div className={`hover:cursor-pointer ${isActive('/auction')}`} onClick={() => navigate('/auction')}>Auction</div>
            <div className={`hover:cursor-pointer ${isActive('/myworks')}`} onClick={() => navigate('/myworks')}>My Works</div>
            <div className={`hover:cursor-pointer ${isActive('/mynfts')}`} onClick={() => navigate('/mynfts')}>My NFTs</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-12 w-full bg-[#402530] fixed top-0 flex justify-between items-center md:px-24 py-6 text-white z-30">
      <div className="hover:cursor-pointer text-[15px] md:text-[26px] font-semibold">Bidcampus</div>

      {/* Desktop Menu */}
      <div className='md:flex justify-evenly gap-20 text-[16px] font-medium hidden'>
        {renderMenuItems()}
      </div>

      {/* Logout Button */}
      <div className="hover:cursor-pointer hidden md:block font-medium">
        <div onClick={() => navigate('/login')}><FaSignOutAlt /></div>
      </div>

      {/* Mobile Menu Button */}
      <div className="bg-gray-200 rounded-full p-1 md:hidden">
        {!toggleMenu ? (
          <IoMenu fontSize={26} color="black" className="cursor-pointer" onClick={() => setToggleMenu(true)} />
        ) : (
          <div className={`fixed right-0 top-1.5 p-3 h-auto shadow-2xl px-4 flex flex-col items-center rounded-3xl bg-gray-300 text-black ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}>
            {renderMenuItems()}
            <div onClick={() => handleMenuClose()} className="flex justify-center px-4 py-1.5 bg-black text-white rounded cursor-pointer">
              <AiOutlineCloseCircle fontSize={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

