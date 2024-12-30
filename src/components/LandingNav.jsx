import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const linkStyle="text-lg font-bold transition duration-300 hover:scale-110 active:scale-90";
  const linkStyleM="text-lg font-bold";

  return (
    <nav className="bg-white/30 backdrop-blur-md p-5 fixed w-full shadow-2xl z-50 rounded-b-xl">
      <div className="container mx-auto flex justify-end items-center">
        <div className="hidden md:flex space-x-10">
          <Link to="/signin" className={linkStyle}>Sign In</Link>
          <Link to="/signup" className={linkStyle}>Sign Up</Link>
          <Link to="/about" className={linkStyle}>About Us</Link>
          <Link to="/contact" className={linkStyle}>Contact Us</Link>
          <Link to="/home" className={linkStyle}>Home</Link> {/*chumma*/}
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
      <div
        className={`md:hidden grid gap-5 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100 pt-10' : 'max-h-0 opacity-0'}`} onClick={toggleMenu}>
        <Link to="/signin" className={linkStyleM}>Sign In</Link>
        <Link to="/signup" className={linkStyleM}>Sign Up</Link>
        <Link to="/about" className={linkStyleM}>About Us</Link>
        <Link to="/contact" className={linkStyleM}>Contact Us</Link>
        <Link to="/home" className={linkStyle}>Home</Link> {/*chumma*/}
      </div>
    </nav>
  );
}

export default LandingNav;
