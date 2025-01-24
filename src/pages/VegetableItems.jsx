import React from 'react'
import Navbar from '../components/Navbar';
import VegetableInfo from '../components/VegetableInfo';
import { useEffect,useState } from 'react';
import axios from 'axios';
import origin from '../utilities/Origin';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { FaBackspace } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VegetableItems = () => {
  const [items,setItems]=useState(null);
  const [selected,setSelected]=useState(null);
  const location = useLocation();
  const navigate=useNavigate();
  const buttonStyle='rounded-md bg-[#347928] hover:scale-110 active:scale-95 px-3 py-2 text-lg md:text-xl text-white transition-all duration-300 font-semibold';
  const [quantity,setQuantity]=useState("");
  const [loading,setLoading]=useState(false);
  const [cost,setCost]=useState("");
  const [msg,setMsg]=useState("");

  function capitalize(str) 
  {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const generateId =()=>{
    const date = new Date();
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  }

  const handleAddToCart=async(e) =>{
    e.preventDefault();
    if(cost==="")
    {
      setMsg("Choose any quantity");
      return
    }
    setLoading(true);
    const id=generateId();
    const cartItem={item:selected.item, quantity, cost, url:selected.url, price:selected.price, id};
    try 
    {
      const response = await axios.post(`${origin}/add-to-cart`,cartItem);
      if (response.data.success)
      {
        setMsg("Item added to the cart successfully");
        setLoading(false);
      }
      else
        navigate("/signin");
    } 
    catch (error) 
    {
      
    }
  }

  const handleQuantityChange =(e)=>{
    const quant=e.target.value
    setCost(selected.price*quant);
    setQuantity(quant);
  }

  const goBack =()=>{
    setCost("");
    setQuantity("");
    setSelected(null);
    setMsg("");
  }

  useEffect(()=>{
    const fetchItemsInfo= async() =>{
      axios.defaults.withCredentials = true;
      try 
      {
        const response = await axios.get(`${origin}/fetch-items-info`);
        if (response.data.success)
        {
          const vegetables = response.data.data.filter((item) => item.type === 'vegetable');
          setItems(vegetables);
        }
      } 
      catch (error) 
      {
        console.log(error);
      }
    }
    fetchItemsInfo();
  },[])

  useEffect(() => {
      if (location.state && location.state.selectedItem) {
        setSelected(location.state.selectedItem);
      }
  }, []);

  if (!items) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <VegetableInfo />
        </div>
        <div className='flex justify-center items-center h-screen scale-150'>
          <Loader />
        </div>
      </div>
    );
  }

  if (items.length===0) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <VegetableInfo />
        </div>
        <div className='flex justify-center items-center h-screen scale-150'>
          Not available
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading && 
        <div className='bg-white/40 backdrop-blur-2xl h-screen z-[150] flex justify-center items-center scale-150 fixed left-0 right-0 top-0'>
          <Loader />
        </div>
      }
      <Navbar />
      {(selected===null) &&
        <div className='bg-gradient-to-b from-[#FFFBE6] to-[#347928]'>
          <div className="pt-20">
            <VegetableInfo />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 sm:px-5 px-2 py-5 overflow-hidden">
            {items.map((item) => (
              <div key={item._id} className="bg-white/40 backdrop-blur-2xl md:p-2 p-1 rounded-xl shadow-lg hover:shadow-2xl hover:bg-white/50 transition-all duration-200 overflow-hidden border">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img src={item.url} className="hover:scale-125 transition-transform duration-300" />
                </div>
                <div className='flex justify-between items-center p-2'>
                  <div>
                    <h2 className="text-xl font-bold">{capitalize(item.item)}</h2>
                    <p>₹{item.price} per Kg</p>
                  </div>
                  <button className={buttonStyle} onClick={() => setSelected(item)}>View</button>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      }
      {(selected!==null) &&
        <div className="pt-20 grid gap-5">
          <div className='px-5'>
            <button className={buttonStyle} onClick={goBack}> <FaBackspace size={20} /> </button>
          </div>
          <div className="bg-transparent p-2 flex md:flex-row flex-col items-center gap-10 justify-around">
            <div className="overflow-hidden rounded-xl">
              <img src={selected.url} className="hover:scale-125 transition-all duration-200" />
            </div>

            <form className='grid bg-[#FCCD2A] shadow-lg backdrop-blur-2xl p-5 rounded-xl md:w-2/5 w-full border-gray-300 border-4' onSubmit={handleAddToCart}>
              <div className='py-2'>
                <h2 className="text-2xl font-bold">{capitalize(selected.item)}</h2>
                <p className="text-lg font-semibold">₹{selected.price} per Kg</p>
              </div>
              <hr />
              <div className='grid gap-1 py-2'>
                <p className="text-xl font-bold">Quantity needed</p>
                <select className='text-black font-semibold rounded-md hover:scale-105 transition-transform duration-300 w-3/4 border p-1' value={quantity} onChange={handleQuantityChange}>
                  <option value="" disabled> Select the needed quantity </option>
                  <option value="0.25">0.25 Kg (quarter)</option>
                  <option value="0.5">0.5 Kg (half)</option>
                  <option value="0.75">0.75 Kg</option>
                  <option value="1">1 Kg</option>
                  <option value="1.5">1.5 Kg</option>
                  <option value="2">2 Kg</option>
                </select>
                {(cost!=="") &&
                  <p className="text-xl font-bold">Cost for your quantity is ₹{cost}</p>
                }
              </div>
              <hr />
              <div className='py-4 flex justify-center'>
                <button type="submit" className={buttonStyle}> Add to Cart</button>
              </div>
              <div className='py-4 flex justify-center text-lg font-bold'>
                {msg}
               </div>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default VegetableItems