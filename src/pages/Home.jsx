import React from 'react'
import Fruits from '../components/Fruits'
import Vegetables from '../components/Vegetables'
import VegeInfo from '../components/VegeInfo'
import Search from '../components/Search'
import Navbar from '../components/Navbar'
import Dairies from '../components/Dairies'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = () => {
  const buttonStyle='rounded-lg hover:bg-[#FCCD2A] hover:scale-110 active:scale-95 p-3 text-lg md:text-xl text-black transition-all duration-300 mb-2 bg-white font-semibold';

  return (
    <div>
      <Navbar />

      <div className='grid place-items-center pt-20 scale-90' id='search'>
        <VegeInfo />
      </div>

      <div className='py-24'>
        <Search />
      </div>

      <div className='grid place-items-center gap-5 my-20 bg-[#347928] py-2'>
        <Fruits />
        <Link to="/fruits" className={buttonStyle}>View Fruits</Link>
      </div>

      <div className='grid place-items-center gap-5 my-20 bg-[#347928] py-2'>
        <Vegetables />
        <Link to="/vegetables" className={buttonStyle}>View Vegetables</Link>
      </div>

      <div className='grid place-items-center gap-5 my-20 bg-[#347928] py-2'>
        <Dairies />
        <Link to="/dairies" className={buttonStyle}>View Dairies</Link>
      </div>

      <Footer />
    </div>
  )
}

export default Home