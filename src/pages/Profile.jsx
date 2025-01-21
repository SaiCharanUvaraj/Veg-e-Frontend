import React, { useState, useEffect } from 'react';
import origin from '../utilities/Origin';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ProfileInfo from '../components/ProfileInfo';
import VegeInfo from '../components/VegeInfo'

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null); 
  const navigate = useNavigate();  
  const buttonStyle='rounded-lg hover:bg-[#FCCD2A] bg-[#347928] text-center w-32 hover:scale-110 active:scale-95 p-3 text-lg md:text-xl text-black transition-all duration-300 mb-2 font-semibold';
  useEffect(() => {
    const fetchInfo = async () => {
      axios.defaults.withCredentials = true;
      try 
      {
        const response = await axios.get(`${origin}/fetch-info`);
        if (response.data.success)
          setUserInfo(response.data.data);
        else
          navigate('/signin');
      } 
      catch (error) 
      {
        navigate('/signin');
      }
    };
    fetchInfo();
  }, []);

  const capitalize=(str)=> {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formatDob=(dob)=>{
    const date=new Date(dob);
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDay();
    const months = {"0": "January", "1": "February", "2": "March", "3": "April", "4": "May", "5": "June", "6": "July", "7": "August",
      "8": "September", "9": "October", "10": "November", "11": "December"};
    return `${months[month]} ${day}, ${year}`;
  }

  if (!userInfo) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <ProfileInfo />
        </div>
        <div className='flex justify-center items-center h-screen scale-150'>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <ProfileInfo />
      </div>
      <div className='grid md:grid-cols-2'>
        <div className='flex flex-col gap-5 bg-white/50 backdrop-blur-3xl rounded-xl shadow-lg border p-5 m-2 md:mx-10'>
          <div>
            <p className="text-xl font-bold underline">Name</p>
            <p className="text-lg font-semibold">{capitalize(`${userInfo.name.fname} ${userInfo.name.lname}`)}</p>
          </div>
          <div>
            <p className="text-xl font-bold underline">Age</p>
            <p className="text-lg font-semibold">{new Date().getFullYear() - new Date(userInfo.dob).getFullYear()}</p>
          </div>
          <div>
            <p className="text-xl font-bold underline">Date of Birth</p>
            <p className="text-lg font-semibold">{formatDob(userInfo.dob)}</p>
          </div>
          <div>
            <p className="text-xl font-bold underline">Phone</p>
            <p className="text-lg font-semibold">{userInfo.phone}</p>
          </div>
          <div>
            <p className="text-xl font-bold underline">Shipping Address</p>
            <p className="text-lg font-semibold">{userInfo.address.plot},</p>
            <p className="text-lg font-semibold">{userInfo.address.road},</p>
            <p className="text-lg font-semibold">{userInfo.address.locality},</p>
            <p className="text-lg font-semibold">{userInfo.address.city},</p>
            <p className="text-lg font-semibold">{`${userInfo.address.state} - ${userInfo.address.pin}.`}</p>
          </div>
          <div className='grid gap-2'>
            <p className="text-xl font-bold underline">Check your current cart</p>
            <Link className={buttonStyle} to="/cart">Cart</Link>
          </div>
          <div className='grid gap-2'>
            <p className="text-xl font-bold underline">Check your order history</p>
            <Link className={buttonStyle}>History</Link>
          </div>
        </div>
        <div className='grid gap-2 place-content-center place-items-center'>
          <p className="text-xl font-bold">Update your profile</p>
          <Link className={buttonStyle} >Update</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;