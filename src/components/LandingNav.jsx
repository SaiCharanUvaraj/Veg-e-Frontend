import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaList, FaChevronDown, FaCarrot, FaAppleAlt, FaCheese } from "react-icons/fa";

const LandingNav = () => {
  // State to handle the mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState(false);

  // Toggle function to open and close the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleItemsDropdown = () => {
    setItemLists(!itemLists);
  };

  // Styling for links in desktop view
  const linkStyle = " flex items-center space-x-1 text-lg font-bold transition duration-300 hover:scale-110 active:scale-90";
  // Styling for links in mobile view
  const linkStyleM = "flex items-center space-x-1 text-lg font-bold";
  const dropdownStyle = 'absolute grid place-items-start gap-3 mt-7 bg-white/50 backdrop-blur-2xl shadow-2xl rounded-lg text-black p-3 border';
  const dropdownStyleM = 'grid place-items-start gap-3 mt-2 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-3';

  return (
    <nav className="bg-white/30 backdrop-blur-md p-5 fixed w-full shadow-2xl z-50 rounded-b-xl">
      <div className="container mx-auto flex justify-end items-center">
        
        {/* Desktop Menu - Hidden on mobile */}
        <div className="hidden md:flex space-x-10">
          <Link to="/signin" className={linkStyle}>
            <FaSignInAlt />
            <p>Sign In</p>
          </Link>
          <Link to="/signup" className={linkStyle}>
            <FaUserPlus />
            <p>Sign Up</p>
          </Link>
          {/* Items Dropdown */}
          <div>
            <Link className={linkStyle} onClick={toggleItemsDropdown}>
              <FaList  />
              <p>Items</p>
              <FaChevronDown />
            </Link>
            {/* Display dropdown if itemLists is true */}
            {itemLists && 
              <div className={dropdownStyle}>
                <Link to="/vegetables" className={linkStyle}>
                  <FaCarrot />
                  <p>Vegetables</p>
                </Link>
                <Link to="/fruits" className={linkStyle}>
                  <FaAppleAlt />
                  <p>Fruits</p>
                </Link>
                <Link to="/dairies" className={linkStyle}>
                  <FaCheese />
                  <p>Dairies</p>
                </Link>
              </div>
            }
          </div>
          <Link to="/about" className={linkStyle}>About Us</Link>
          <Link to="/contact" className={linkStyle}>Contact Us</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          {/* If the menu is not open, show the hamburger icon */}
          {(!isOpen) &&
            <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <FaBars />
            </button>
          }

          {/* If the menu is open, show the close icon */}
          {(isOpen) &&
            <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <FaTimes />
            </button>
          }
        </div>
      </div>

      {/* Mobile Menu - Displayed when the menu is open */}
      <div
        className={`md:hidden grid gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100 pt-10' : 'max-h-0 opacity-0'}`} onClick={toggleMenu}>
        <Link to="/signin" className={linkStyleM}>
          <FaSignInAlt />
          <p>Sign In</p>
        </Link>
        <Link to="/signup" className={linkStyleM}>
          <FaUserPlus />
          <p>Sign Up</p>
        </Link>
        {/* Items Dropdown */}
        <div>
          <Link className={linkStyle} onClick={toggleItemsDropdown}>
            <FaList  />
            <p>Items</p>
            <FaChevronDown />
          </Link>
          {/* Display dropdown if itemLists is true */}
          {itemLists && 
            <div className={dropdownStyleM}>
              <Link to="/vegetables" className={linkStyleM}>
                <FaCarrot />
                <p>Vegetables</p>
              </Link>
              <Link to="/fruits" className={linkStyleM}>
                <FaAppleAlt />
                <p>Fruits</p>
              </Link>
              <Link to="/dairies" className={linkStyleM}>
                <FaCheese />
                <p>Dairies</p>
              </Link>
            </div>
          }
        </div>
        <Link to="/about" className={linkStyleM}>About Us</Link>
        <Link to="/contact" className={linkStyleM}>Contact Us</Link>
      </div>
    </nav>
  );
}

export default LandingNav;