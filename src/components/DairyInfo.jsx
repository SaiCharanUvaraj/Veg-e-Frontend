import React from 'react'
import { FaCheese } from 'react-icons/fa'

const DairyInfo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <p className="nerko-one-regular text-7xl text-[#347928]">Dairies</p>
            <div className="text-[#FCCD2A]">
                <FaCheese size={80}/>
            </div>
        </div>
    )
}
export default DairyInfo