import React from 'react'
import Fruits from '../components/Fruits'
import Vegetables from '../components/Vegetables'
import VegeInfo from '../components/VegeInfo'
import Search from '../components/Search'
import Navbar from '../components/Navbar'
import Dairies from '../components/Dairies'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import origin from '../utilities/Origin'
import Loader from '../components/Loader'

const Home = () => {
  const buttonStyle='rounded-lg hover:bg-[#FCCD2A] hover:scale-110 active:scale-95 p-3 text-lg md:text-xl text-black transition-all duration-300 mb-2 bg-white font-semibold';
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
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className='grid place-items-center pt-20 scale-90' id='search'>
        <VegeInfo />
      </div>

      <div className='py-6 bg-[#FCCD2A]'>
        <p className='nerko-one-regular text-5xl text-[#347928] text-center py-5'>
          {userInfo ? `Hi, ${userInfo.name.fname}` : ""}
        </p>
        <Search />
      </div>

      <div className='grid place-items-center gap-5 bg-[#347928] py-2'>
        <Fruits />
        <Link to="/fruits" className={buttonStyle}>View Fruits</Link>
      </div>

      <div className='grid place-items-center gap-5 my-20 bg-[#347928] py-2'>
        <Vegetables />
        <Link to="/vegetables" className={buttonStyle}>View Vegetables</Link>
      </div>

      <div className='grid place-items-center gap-5 my-20 bg-[#347928] py-2'>
        <Dairies />
        <Link to="/dairies" className={buttonStyle}>View Dairies</Link>
      </div>

      <Footer />
    </div>
  )
}

export default Home