import React, { useState, useEffect } from 'react';
import origin from '../utilities/Origin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VegeInfo from '../components/VegeInfo';
import Loader from '../components/Loader';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null); 
  const navigate = useNavigate();  

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
  }, [navigate]);

  if (!userInfo) {
    return (
      <div>
        <Navbar />
        <div className='flex justify-center items-center h-screen scale-150'>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='pt-20'>
        <p>Your Profile</p>
        <div>
          <p>Name</p>
          <p>{`${userInfo.name.fname} ${userInfo.name.lname}`}</p>
          <p>Age</p>
          <p>{new Date().getFullYear() - new Date(userInfo.dob).getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;