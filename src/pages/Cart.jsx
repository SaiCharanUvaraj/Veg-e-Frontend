import React, { useState, useEffect } from 'react';
import origin from '../utilities/Origin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [userInfo, setUserInfo] = useState(null); 
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchInfo = async () => {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${origin}/fetch-info`);
      if(response.data.success)
        setUserInfo(response.data.data);
      else
        navigate('/signin');
    };
    fetchInfo();
  }, []);

  return (
    <div>
        <pre>{JSON.stringify(userInfo ? userInfo.cart : "")}</pre>
    </div>
  );
}
export default Cart