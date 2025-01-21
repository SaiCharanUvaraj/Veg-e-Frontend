import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const CartInfo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <p className="nerko-one-regular text-7xl text-[#347928]">Cart</p>
            <div className="text-[#FCCD2A]">
                <FaShoppingCart size={80}/>
            </div>
        </div>
    )
}

export default CartInfo;