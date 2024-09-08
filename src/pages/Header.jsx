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
      case 'user':
        return (
          <>
            <div className={`hover:cursor-pointer ${isActive('/myfiles')}`} onClick={() => navigate('/myfiles')}>All Files</div>
            <div className={`hover:cursor-pointer ${isActive('/myorgs')}`} onClick={() => navigate('/myorgs')}>My Organisations</div>
            <div className={`hover:cursor-pointer ${isActive('/verifydocs')}`} onClick={() => navigate('/verifydocs')}>Verify NFTs</div>

          </>
        );
      case 'org':
        return (
          <>
            <div className={`hover:cursor-pointer ${isActive('/')}`} onClick={() => navigate('/')}>Members</div>
            <div className={`hover:cursor-pointer ${isActive('/')}`} onClick={() => navigate('/')}>Doc Requests</div>
            <div className={`hover:cursor-pointer ${isActive('/verifydocs')}`} onClick={() => navigate('/verifydocs')}>Verify NFTs</div>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-12 w-full bg-primaryBlack fixed top-0 flex justify-between items-center md:px-12 py-6 text-white">
      <div className="hover:cursor-pointer text-[10px] md:text-[20px] text-primaryGreen font-semibold">docVault</div>

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

