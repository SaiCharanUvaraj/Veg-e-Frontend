import React from 'react'
import LandingNav from '../components/LandingNav'
import VegeInfo from '../components/VegeInfo'
import { Link } from 'react-router-dom'
import Fruits from '../components/Fruits'
import Vegetables from '../components/Vegetables'
import Dairies from '../components/Dairies'

const Landing = () => {
  const buttonStyle="rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-2 text-xl md:text-xl text-white transition-all duration-300"
  const textStyle="text-4xl itim-regular font-bold"
  const divStyle="grid place-items-center gap-y-3"
  return (
    <div className='flex flex-col space-y-20'>
      <LandingNav />

      <div className='grid place-items-center'>
        <VegeInfo />
      </div>

      <Fruits />

      <div className={divStyle}>
        <p className={textStyle}>Already a buyer?</p>
        <Link className={buttonStyle} to="/signin">Sign In</Link>
        <p className={textStyle}>to buy greens</p>
      </div>

      <Vegetables />

      <div className={divStyle}>
        <p className={textStyle}>New to Veg-e?</p>
        <Link className={buttonStyle} to="/signup">Sign Up</Link>
        <p className={textStyle}>to buy your first green</p>
      </div>

      <Dairies />

      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 bg-[#C0EBA6] py-10'>
        <div className={divStyle}>
          <p className={textStyle}>Having any queries?</p>
          <Link className={buttonStyle} to="/contact">Contact Us</Link>
          <p className={textStyle}>to clear your doubts</p>
        </div>
        <div className={divStyle}>
          <p className={textStyle}>Knew about us?</p>
          <Link className={buttonStyle} to="/about">About Us</Link>
          <p className={textStyle}>to know about us </p>
        </div>
      </div>
    </div>
  )
}

export default Landing
