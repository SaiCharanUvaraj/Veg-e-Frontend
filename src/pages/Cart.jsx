import React, { useState, useEffect } from 'react';
import origin from '../utilities/Origin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import CartInfo from '../components/CartInfo';
import Footer from '../components/Footer';

const Cart = () => { 
  const navigate = useNavigate();  
  const [userInfo,setUserInfo]=useState(null)
  const buttonStyle='rounded-md bg-[#347928] hover:scale-110 active:scale-95 px-3 py-2 text-lg md:text-xl text-white transition-all duration-300 font-semibold';
  const [totCost,setTotCost]=useState("");
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [placed,setPlaced]=useState(false);

  function capitalize(str) 
  {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const generateId =()=>{
    const date = new Date();
    return `${userInfo.phone}${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  }

  useEffect(() => {
    const fetchInfo = async () => {
      axios.defaults.withCredentials = true;
      try 
      {
        const response = await axios.get(`${origin}/fetch-info`);
        if (response.data.success)
        {
          setUserInfo(response.data.data);
          setItems(response.data.data.cart);
          const totCost=response.data.data.cart.reduce((total, item) => total + (item.cost || 0), 0);
          setTotCost(totCost);
        }
        else
          navigate('/signin');
      } 
      catch (error) 
      {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const handleRemove=async(id) =>{
    const cartItem={id};
    setLoading(true);
    try 
    {
      const response = await axios.post(`${origin}/remove-from-cart`,cartItem);
      if (response.data.success)
      {
        const updatedItems=items.filter((item)=> item.id !== cartItem.id);
        setItems(updatedItems);
        setLoading(false);
      }
    } 
    catch (error) 
    {
      console.log(error);
    }
  }

  const handlePlaceOrder=async() =>{
    const id=generateId();
    const date=new Date();
    const order={
      id,
      name:userInfo.name,
      phone:userInfo.phone,
      address:userInfo.address,
      date,
      cart:items,
      amount:totCost
    }
    setLoading(true);
    try 
    {
      const response = await axios.post(`${origin}/place-order`,order);
      if (response.data.success)
      {
        setItems([]);
        setLoading(false);
        setPlaced(true);
      }
    } 
    catch (error) 
    {
      console.log(error);
    }
  }

  if (!userInfo) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <CartInfo />
        </div>
        <div className=' mt-10 flex justify-center items-center'>
          <Loader />
        </div>
      </div>
    );
  }

  if (items.length===0 && placed===false) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <CartInfo />
        </div>
        <div className='mt-10 flex nerko-one-regular justify-center items-center text-3xl font-bold text-[#347928]'>
          Your Cart is Empty
        </div>
      </div>
    );
  }

  if (items.length===0 && placed) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <CartInfo />
        </div>
        <div className='mt-10 flex nerko-one-regular flex-col justify-center items-center text-3xl font-bold text-[#347928] gap-3'>
          <p>Your Order is placed.</p>
          <p>Cash on delivery</p>
          <p className='text-black'>Pay ₹{totCost} on delivery </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b from-[#FFFBE6] to-[#347928]'>
      {loading && 
        <div className='bg-white/40 backdrop-blur-2xl h-screen z-[150] flex justify-center items-center scale-150 fixed left-0 right-0 top-0'>
          <Loader />
        </div>
      }
      <Navbar />
      <div className="pt-20">
        <CartInfo />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 m-2 md:mx-10'>
        {items.map((item, index) => (
          <div key={index} className="bg-white/40 backdrop-blur-2xl md:p-2 p-1 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/50 transition-all duration-200 overflow-hidden border">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={item.url} className="hover:scale-125 transition-transform duration-300" />
            </div>
            <div className='flex justify-between items-center p-2'>
              <div>
                <p className="text-xl font-bold">{capitalize(item.item)}</p>
                <p>{item.quantity} Kgs</p>
                <p>₹{item.cost} (₹{item.price} per Kg)</p>
              </div>
              <button className={buttonStyle} onClick={()=>handleRemove(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className='grid gap-2 place-content-center place-items-center p-5 m-2 md:mx-10'>
        <div className="bg-white/40 backdrop-blur-2xl md:p-5 p-2 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/50 transition-all duration-200 overflow-hidden border grid place-items-center gap-5">
          <p className="text-xl font-bold">The total cost of the cart is {totCost}</p>
          <button className={buttonStyle} onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Cart