import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemLists, setItemLists] = useState(false);
  const [accountLists, setAccountLists] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleItemsDropdown = () =>{
    setItemLists(!itemLists);
  }

  const toggleAccountDropdown = () =>{
    setAccountLists(!accountLists);
  }

  const handleSearchClick = () => {
    const searchElement = document.getElementById('search');
    if (searchElement)
      searchElement.scrollIntoView({ behavior: 'smooth' });
  };

  const linkStyle="flex items-center text-lg font-bold transition duration-300 hover:scale-110 active:scale-90";
  const iconStyle="w-7 h-7 text-black";
  const linkStyleM="flex items-center text-lg font-bold";
  const dropdownStyle ='grid place-items-center absolute gap-3 mt-2 bg-white/40 backdrop-blur-2xl shadow-lg rounded-lg text-black p-3';
  const dropdownStyleM ='grid place-items-center gap-3 mt-2 bg-white/40 backdrop-blur-2xl shadow-lg rounded-lg text-black p-3';

  return (
    <nav className="bg-white/30 backdrop-blur-lg p-5 fixed w-full z-50 rounded-b-xl shadow-lg">
      <div className="container mx-auto flex justify-end items-center">
        <div className="hidden md:flex space-x-10">
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
              {(itemLists) && 
                <div className={dropdownStyle}>
                  <Link to="/vegetables" className={linkStyle}>
                    Vegetables
                  </Link>
                  <Link to="/fruits" className={linkStyle}>
                    Fruits
                  </Link>
                  <Link to="/dairies" className={linkStyle}>
                    Dairies
                  </Link>
              </div>}
            </div>

            <Link to="/cart" className={linkStyle}>
                <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>
                My Cart
            </Link>

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
              {(accountLists) && 
                <div className={dropdownStyle}>
                  <Link to="/settings" className={linkStyle}>
                    <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    Settings
                  </Link>
                  <Link to="/profile" className={linkStyle}>
                    <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                    </svg>
                    Profile
                  </Link>
                  <Link className={linkStyle}>
                    Log Out
                  </Link>
              </div>}
            </div>

            <Link className={linkStyle} onClick={handleSearchClick}>
                <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
                Search
            </Link>

            <Link to="/contact" className={linkStyle}>Contact Us</Link>

            <Link to="/about" className={linkStyle}>About Us</Link>
        </div>

        <div className="md:hidden">
          {(!isOpen) &&
            <button onClick={toggleMenu} className="text-[#347928] 
            scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <svg className="w-7 h-7 text-[#347928]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          }
          {(isOpen) &&
            <button onClick={toggleMenu} className="text-[#347928] 
            scale-125 hover:scale-150 focus:outline-none transition duration-300 active:scale-100">
              <svg className="w-7 h-7 text-[#347928]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          }
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden grid gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-full opacity-100 pt-10' : 'max-h-0 opacity-0'}`}>
        
        <div>
          <Link to="/home" className={linkStyleM} onClick={toggleItemsDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={iconStyle}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18l-1.406 9.19a2 2 0 01-1.992 1.81H6.398a2 2 0 01-1.992-1.81L3 7zm5 0V5a4 4 0 118 0v2" />
              </svg>
              Items
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
          </Link>
          {(itemLists) && 
            <div className={dropdownStyleM}>
              <Link to="/vegetables" className={linkStyle}>
                Vegetables
              </Link>
              <Link to="/fruits" className={linkStyle}>
                Fruits
              </Link>
              <Link to="/dairies" className={linkStyle}>
                Dairies
              </Link>
            </div>
          }
        </div>

        <Link to="/home" className={linkStyleM}>
            <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
            </svg>
            My Cart
        </Link>

        <div>
          <Link to="/home" className={linkStyleM} onClick={toggleAccountDropdown}>
              <svg className={iconStyle} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
              Account
              <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
          </Link>
          {(accountLists) && 
            <div className={dropdownStyleM}>
              <Link to="/settings" className={linkStyle}>
                <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                Settings
              </Link>
              <Link to="/profile" className={linkStyle}>
                <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                </svg>
                Profile
              </Link>
              <Link className={linkStyle}>
                Log Out
              </Link>
            </div>
          }
        </div>

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
}

export default Navbar;