import React from 'react';

// Sample image array with direct image URLs
const fruits= [
  'https://cdn.pixabay.com/photo/2021/09/16/15/26/fruit-6630377_1280.jpg',
  'https://cdn.pixabay.com/photo/2022/07/10/20/15/raspberries-7313700_640.jpg',
  'https://cdn.pixabay.com/photo/2023/11/04/09/23/bananas-8364511_640.jpg',
  'https://cdn.pixabay.com/photo/2023/08/16/10/09/oranges-8193789_640.jpg',
  'https://cdn.pixabay.com/photo/2023/12/09/21/03/pineapple-8440180_640.jpg',
  'https://cdn.pixabay.com/photo/2023/07/31/16/37/sugar-apple-8161386_640.jpg',
  'https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_640.jpg',
  'https://cdn.pixabay.com/photo/2018/06/07/16/38/blueberries-3460423_640.jpg'
]

const Fruits = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#347928] px-5 py-14">
        <p className='text-4xl text-[#FCCD2A] text-center dynapuff font-bold p-2'>Fruits</p>
        <p className='text-2xl text-white text-center dynapuff mb-2'>Nature's sweetness delivered fresh to your door</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-items-center">
          {fruits.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img src={src} alt={`Image ${index + 1}`} className="hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
    </div>
  );
};

export default Fruits;
