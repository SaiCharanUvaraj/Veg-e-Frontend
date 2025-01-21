import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const ProfileInfo = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <p className="nerko-one-regular text-7xl text-[#347928]">Profile</p>
            <div className="text-[#FCCD2A]">
                <FaUserCircle size={80}/>
            </div>
        </div>
    )
}

export default ProfileInfo;