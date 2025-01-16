import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import origin from '../utilities/Origin';

const Navbar = () => {
  const navigate = useNavigate();

  // State hooks to manage the visibility of dropdown menus and the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState(false);
  const [accountLists, setAccountLists] = useState(false);

  // Toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the visibility of the "Items" dropdown menu
  const toggleItemsDropdown = () => {
    setItemLists(!itemLists);
  };

  // Toggle the visibility of the "Account" dropdown menu
  const toggleAccountDropdown = () => {
    setAccountLists(!accountLists);
  };

  // Smooth scroll to the search section when search button is clicked
  const handleSearchClick = () => {
    const searchElement = document.getElementById('search');
    if (searchElement)
      searchElement.scrollIntoView({ behavior: 'smooth' });
  };

  //handle logout
  const logout = async() =>{
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${origin}/logout`,{});
    if(response.data.success)
      navigate('/');
  }

  // Style variables for consistent styling across links and icons
  const linkStyle = "flex items-center text-lg font-bold transition duration-300 hover:scale-110 active:scale-90";
  const iconStyle = "w-7 h-7 text-black";
  const linkStyleM = "flex items-center text-lg font-bold";
  const dropdownStyle = 'grid place-items-center absolute gap-3 mt-7 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-3';
  const dropdownStyleM = 'grid place-items-center gap-3 mt-2 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-3';

  return (
    <nav className="bg-white/30 backdrop-blur-lg p-5 fixed w-full z-50 rounded-b-xl shadow-2xl">
      <div className="container mx-auto flex justify-end items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {/* Items Dropdown */}
          <div>
            <Link className={linkStyle} onClick={toggleItemsDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={iconStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18l-1.406 9.19a2 2 0 01-1.992 1.81H6.398a2 2 0 01-1.992-1.81L3 7zm5 0V5a4 4 0 118 0v2" />
              </svg>
              Items
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
            </Link>
            {/* Display dropdown if itemLists is true */}
            {itemLists && 
              <div className={dropdownStyle}>
                <Link to="/vegetables" className={linkStyle}>Vegetables</Link>
                <Link to="/fruits" className={linkStyle}>Fruits</Link>
                <Link to="/dairies" className={linkStyle}>Dairies</Link>
              </div>}
          </div>

          {/* Cart Link */}
          <Link to="/cart" className={linkStyle}>
            <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
            </svg>
            My Cart
          </Link>

          {/* Account Dropdown */}
          <div>
            <Link className={linkStyle} onClick={toggleAccountDropdown}>
              <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              Account
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
            </Link>
            {/* Display dropdown if accountLists is true */}
            {accountLists && 
              <div className={dropdownStyle}>
                <Link to="/settings" className={linkStyle}>
                  Settings
                </Link>
                <Link to="/profile" className={linkStyle}>
                  Profile
                </Link>
                <button onClick={logout}>
                  <Link className={linkStyle}>Log Out</Link>
                </button>
              </div>}
          </div>

          {/* Search Link */}
          <Link className={linkStyle} onClick={handleSearchClick}>
            <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
            Search
          </Link>

          {/* Other Links */}
          <Link to="/contact" className={linkStyle}>Contact Us</Link>
          <Link to="/about" className={linkStyle}>About Us</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* Toggle button for opening and closing the mobile menu */}
          {(!isOpen) && 
            <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <svg className="w-7 h-7 text-[#347928]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          }
          {(isOpen) && 
            <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <svg className="w-7 h-7 text-[#347928]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          }
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden grid gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full opacity-100 pt-10' : 'max-h-0 opacity-0'}`}>
        {/* Items Dropdown for Mobile */}
        <div>
          <Link className={linkStyleM} onClick={toggleItemsDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={iconStyle}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18l-1.406 9.19a2 2 0 01-1.992 1.81H6.398a2 2 0 01-1.992-1.81L3 7zm5 0V5a4 4 0 118 0v2" />
            </svg>
            Items
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
            </svg>
          </Link>
          {itemLists && 
            <div className={dropdownStyleM}>
              <Link to="/vegetables" className={linkStyleM}>Vegetables</Link>
              <Link to="/fruits" className={linkStyleM}>Fruits</Link>
              <Link to="/dairies" className={linkStyleM}>Dairies</Link>
            </div>}
        </div>

        {/* Account Dropdown for Mobile */}
        <div>
          <Link className={linkStyleM} onClick={toggleAccountDropdown}>
            <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
            Account
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
            </svg>
          </Link>
          {accountLists && 
            <div className={dropdownStyleM}>
              <Link to="/settings" className={linkStyleM}>Settings</Link>
              <Link to="/profile" className={linkStyleM}>Profile</Link>
              <button onClick={logout}>
                  <Link className={linkStyleM}>Log Out</Link>
              </button>
            </div>}
        </div>

        {/* Cart and Other Links */}
        <Link to="/cart" className={linkStyleM}>
          <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
          </svg>
          My Cart
        </Link>
        <Link className={linkStyleM} onClick={handleSearchClick}>
          <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
            Search
        </Link>
        <Link to="/contact" className={linkStyleM}>Contact Us</Link>
        <Link to="/about" className={linkStyleM}>About Us</Link>
      </div>
    </nav>
  );
};
export default Navbar;