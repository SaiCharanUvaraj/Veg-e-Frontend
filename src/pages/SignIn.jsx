import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VegeInfo from '../components/VegeInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import origin from '../utilities/Origin';
import Loader from '../components/Loader';

const SignIn = () => {
  const [form, setForm] = useState({
    phone: "",
    pwd: ""
  });
  const [msg,setMsg]=useState("");
  const [forgot,setForgot]=useState(false);
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const inputBoxStyle = "rounded-lg mt-2 w-5/6 focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2";
  const lableStyle = "text-lg font-semibold";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.phone==="" || form.pwd==="")
    {
      setMsg("Enter your registered phone number and password.");
      return
    }
    setLoading(true);
    setMsg("Signing into your account...")
    try
    {
      const response=await axios.post(`${origin}/auth-user`,{phone:form.phone, pwd:form.pwd});
      if(response.data.success===true)
        navigate('/home');
      else  
        setMsg(response.data.message);
    }
    catch
    {
      setMsg('Error in signing into account. Please try again !');
    }
    setLoading(false);
  };

  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    if(form.phone==="")
      setMsg("Enter your registered phone number");
    else if(otp==="")
      setMsg("Enter the OTP sent to your phone number")
    else
    {
      setLoading(true);
      setMsg("Signing into your account...")
      try
      {
        const response = await axios.post(`${origin}/verify-forgot-otp`, { number: form.phone, otp });
        setMsg(response.data.message);
        if(response.data.success===true)
          navigate('/home');
        else
          setOtp("");
      }
      catch
      {
        setMsg('Error in verifying OTP. Please try again !');
      }
      setLoading(false);
    }
  };

  const handleOtpChange = (e) =>{
    setOtp(e.target.value);
  }

  const forgotPwd= async()=>{
    if(form.phone==="")
      setMsg("Enter your phone number");
    else if(form.phone.length!=10)
      setMsg("Invalid phone number");
    else
    {
      setLoading(true);
      try 
      {
        const response = await axios.post(`${origin}/forgot-password`, { number: form.phone });
        if(response.data===false)
          setMsg("The Phone number is not registered !"); 
        else
        {
          setForgot(true);
          setMsg(response.data); 
        }
      } 
      catch (error) 
      {
        setMsg('Error in sending OTP. Please try again !');
      }
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 h-screen gap-5">

        <div className='grid place-items-center'>
          <VegeInfo />
          <Link to="/">
            <button className="bg-[#347928] p-2 text-white rounded-lg hover:scale-110 active:scale-95 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          </Link>
        </div>

        <div className="bg-[#C0EBA6] flex flex-col justify-center items-center py-10 px-2">
          <p className='nerko-one-regular text-5xl text-[#347928] font-bold text-center pb-10'> Get into your Account here</p>
          
          <form className="bg-[#FCCD2A] rounded-xl sm:w-4/5 w-full">
            <center>
              <p className="bg-[#347928] rounded-t-xl text-white p-3 text-center font-bold text-2xl md:text-3xl shadow-lg shadow-black">
                Sign In
              </p>
              <div className="my-3 p-4">
                <div className="my-4">
                  <label className={lableStyle}>Your Phone Number</label><br />
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} className={inputBoxStyle} />
                </div>
                {forgot && (
                  <div>
                    <input type="text" className={inputBoxStyle} placeholder='Enter your OTP here' required value={otp} onChange={handleOtpChange}/>
                    <br />
                  </div>
                )}
                {!forgot && (
                  <div className="my-4">
                    <label className={lableStyle}>Your Password</label><br />
                    <input type="password" name="pwd" value={form.pwd} onChange={handleChange} className={inputBoxStyle} />
                    <div>
                      <Link className="text-black hover:underline text-lg font-bold my-2" onClick={forgotPwd}>Forgot Password?</Link>
                      <br />
                    </div>
                  </div>
                )}
              </div>
              <div className='my-2 text-lg text-red-600 font-bold'>
                {msg}
              </div>
              <div>
                {loading && <Loader />}
              </div>
              {forgot && (
                <button className="rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-2 text-lg md:text-xl text-white transition-all duration-300 mb-2" onClick={handleOtpSubmit}>
                  Sign In
                </button>
              )}
              {!forgot && (
                <button className="rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-2 text-lg md:text-xl text-white transition-all duration-300 mb-2" onClick={handleSubmit}>
                  Sign In
                </button>
              )}
              <div className='mb-4'>
                  <p className="text-sm">Don't have an account? Then</p>
                  <Link to="/signup" className="text-black hover:underline text-lg font-bold">Sign Up</Link>
              </div>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
