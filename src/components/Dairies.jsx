import React from 'react';

// Sample image array with direct image URLs
const dairies= [
  'https://cdn.pixabay.com/photo/2018/02/25/07/15/food-3179853_1280.jpg',
  'https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_640.jpg',
  'https://cdn.pixabay.com/photo/2015/01/12/11/35/slice-the-tofu-597229_640.jpg',
  'https://cdn.pixabay.com/photo/2022/07/26/13/55/egg-7345934_1280.jpg'
]

const Dairies = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#347928] px-5 py-14">
        <p className='text-4xl text-[#FCCD2A] text-center dynapuff font-bold p-2'>Dairy Products</p>
        <p className='text-2xl text-white text-center dynapuff mb-2'>Pure, Natural, and Delicious Dairy!</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-items-center">
          {dairies.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img src={src} alt={`Image ${index + 1}`} className="hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
    </div>
  );
};

export default Dairies;
