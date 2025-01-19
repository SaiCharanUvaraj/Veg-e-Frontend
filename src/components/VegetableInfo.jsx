import React from 'react'
import {FaCarrot } from "react-icons/fa";
const VegetableInfo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <p className="nerko-one-regular text-7xl text-[#347928]">Vegetables</p>
            <div className="text-[#FCCD2A]">
                <FaCarrot size={80}/>
            </div>
        </div>
    )
}

export default VegetableInfo