import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import origin from '../utilities/Origin';
import { FaCog, FaShoppingCart, FaUserCircle, FaList, FaSignOutAlt, FaAppleAlt, FaCarrot } from "react-icons/fa";
import { FaBars, FaTimes, FaHome, FaSearch, FaChevronDown, FaUser, FaCheese } from "react-icons/fa";

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

  // Handle logout
  const logout = async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${origin}/logout`, {});
    if (response.data.success)
      navigate('/');
  };

  // Style variables for consistent styling across links and icons
  const linkStyle = "flex items-center text-lg justify-center space-x-1 font-bold transition duration-300 hover:scale-110 active:scale-90";
  const linkStyleM = "flex items-center space-x-1 text-lg font-bold";
  const dropdownStyle = 'absolute grid place-items-start gap-3 mt-7 bg-white/50 backdrop-blur-2xl shadow-2xl rounded-lg text-black p-3 border';
  const dropdownStyleM = 'grid place-items-start gap-3 mt-2 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-3';

  return (
    <nav className="bg-white/40 backdrop-blur-lg p-2 fixed w-full z-[100] rounded-b-xl shadow-2xl">
      <div>
        <div className="container mx-auto flex justify-between items-center px-2">
          {/* Logo */}
          <Link to="/home" className="nerko-one-regular soft-shadow-text text-5xl font-extrabold text-[#347928] hover:scale-110 transition duration-300">
            Veg-e
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-10">

            {/* Home */}
            <Link to="/home" className={linkStyle}>
              <FaHome />
              <p>Home</p>
            </Link>

            {/* Items Dropdown */}
            <div>
              <Link className={linkStyle} onClick={toggleItemsDropdown}>
                <FaList />
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

            {/* Cart Link */}
            <Link to="/cart" className={linkStyle}>
              <FaShoppingCart />
              <p>My Cart</p>
            </Link>

            {/* Account Dropdown */}
            <div>
              <Link className={linkStyle} onClick={toggleAccountDropdown}>
                <FaUser />
                <p>Account</p>
                <FaChevronDown />
              </Link>
              {/* Display dropdown if accountLists is true */}
              {accountLists &&
                <div className={dropdownStyle}>
                  <Link to="/settings" className={linkStyle}>
                    <FaCog />
                    <p>Settings</p>
                  </Link>
                  <Link to="/profile" className={linkStyle}>
                    <FaUserCircle />
                    <p>Profile</p>
                  </Link>
                  <Link to="/contact" className={linkStyle}>Contact Veg-e</Link>
                  <Link to="/about" className={linkStyle}>About Veg-e</Link>
                  <button onClick={logout}>
                    <Link className={linkStyle}>
                      <FaSignOutAlt />
                      <p>Log Out</p>
                    </Link>
                  </button>
                </div>
              }
            </div>

            {/* Search Link */}
            <Link className={linkStyle} onClick={handleSearchClick}>
              <FaSearch />
              <p>Search</p>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            {/* Toggle button for opening and closing the mobile menu */}
            {(!isOpen) &&
              <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
                <FaBars />
              </button>
            }
            {(isOpen) &&
              <button onClick={toggleMenu} className="text-[#347928] scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
                <FaTimes />
              </button>
            }
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden grid gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full opacity-100 pt-10' : 'max-h-0 opacity-0'}`}>
          <Link to="/home" className={linkStyleM}>
            <FaHome />
            <p>Home</p>
          </Link>
          {/* Items Dropdown for Mobile */}
          <div>
            <Link className={linkStyleM} onClick={toggleItemsDropdown}>
              <FaList />
              <p>Items</p>
              <FaChevronDown />
            </Link>
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
              </div>}
          </div>

          <Link to="/cart" className={linkStyleM}>
            <FaShoppingCart />
            <p>My Cart</p>
          </Link>

          {/* Account Dropdown for Mobile */}
          <div>
            <Link className={linkStyleM} onClick={toggleAccountDropdown}>
              <FaUser />
              <p>Account</p>
              <FaChevronDown />
            </Link>
            {accountLists &&
              <div className={dropdownStyleM}>
                <Link to="/settings" className={linkStyle}>
                  <FaCog />
                  <p>Settings</p>
                </Link>
                <Link to="/profile" className={linkStyle}>
                  <FaUserCircle />
                  <p>Profile</p>
                </Link>
                <Link to="/contact" className={linkStyleM}>Contact Veg-e</Link>
                <Link to="/about" className={linkStyleM}>About Veg-e</Link>
                <button onClick={logout}>
                  <Link className={linkStyle}>
                    <FaSignOutAlt />
                    <p>Log Out</p>
                  </Link>
                </button>
              </div>}
          </div>

          {/* Search */}
          <Link className={linkStyleM} onClick={handleSearchClick}>
            <FaSearch />
            <p>Search</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
