import React from 'react'
import { FaAppleAlt } from 'react-icons/fa'

const FruitInfo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <p className="nerko-one-regular text-7xl text-[#347928]">Fruits</p>
            <div className="text-[#FCCD2A]">
                <FaAppleAlt size={80}/>
            </div>
        </div>
    )
}

export default FruitInfo