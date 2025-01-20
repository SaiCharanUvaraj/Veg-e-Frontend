import React from 'react';

// Sample image array with direct image URLs
const vegetables=[
  'https://cdn.pixabay.com/photo/2014/02/12/18/11/lettuce-264826_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/05/03/13/32/greenhouse-6226263_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/08/11/08/43/potatoes-1585060_640.jpg',
  'https://cdn.pixabay.com/photo/2015/03/14/14/00/carrots-673184_640.jpg',
  'https://cdn.pixabay.com/photo/2020/09/12/21/12/tomatoes-5566741_640.jpg',
  'https://cdn.pixabay.com/photo/2016/05/16/22/47/onions-1397037_640.jpg',
  'https://cdn.pixabay.com/photo/2015/07/17/13/44/cucumbers-849269_640.jpg',
  'https://cdn.pixabay.com/photo/2019/09/05/18/20/harvest-4454745_640.jpg'
];

const Vegetables = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#347928] px-5 py-14">
      <p className='text-4xl text-[#FCCD2A] text-center dynapuff font-bold p-2'>Vegetables</p>
      <p className='text-2xl text-white text-center dynapuff mb-2'>Fresh greens, from farm to your table</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 place-items-center">
          {vegetables.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img src={src} alt={`Image ${index + 1}`} className="hover:scale-110 transition-transform duration-300" />
          </div>
          ))}
      </div>
    </div>
  );
};

export default Vegetables;
