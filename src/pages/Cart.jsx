import React, { useState, useEffect } from 'react';
import origin from '../utilities/Origin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import CartInfo from '../components/CartInfo';

const Cart = () => {
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
  }, []);

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
      <div className="pt-20">
        <CartInfo />
      </div>
      <div className='grid md:grid-cols-2 gap-5 bg-white/50 backdrop-blur-3xl rounded-xl shadow-lg border p-5 m-2 md:mx-10'>
        Cart items
      </div>
      <div className='grid gap-2 place-content-center place-items-center'>
        Ordering
      </div>
    </div>
  );
}
export default Cart