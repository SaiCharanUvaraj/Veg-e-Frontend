import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#C0EBA6] text-black py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h4 className="text-xl font-semibold">Veg-e</h4>
          <p className="text-lg">Fresh Vegetables, Fruits, and Dairy Delivered to Your Doorstep.</p>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Veg-e. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
