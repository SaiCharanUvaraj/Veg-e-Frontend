import React from 'react'
import DairyInfo from '../components/DairyInfo'
import Navbar from '../components/Navbar';

const DairyItems = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <DairyInfo />
      </div>
    </div>
  )
}

export default DairyItems