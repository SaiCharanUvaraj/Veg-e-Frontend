import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VegeInfo from '../components/VegeInfo';
import axios from 'axios';
import { isStrong } from '../utilities/Passwords';
import { useNavigate } from 'react-router-dom';

const origin = import.meta.env.VITE_ORIGIN || "http://localhost:3000";

const SignUp = () => {
  const [form, setForm] = useState({
    phone: "",
    pwd: "",
    cpwd: ""
  });
  const [msg,setMsg]=useState("");
  const [otp,setOtp]=useState("");
  const [otpBox,setOtpBox]=useState(false);
  const [verified,setVerified]=useState(false);
  const navigate=useNavigate();

  const inputBoxStyle = "rounded-lg mt-2 w-5/6 focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2";
  const lableStyle = "text-lg font-semibold";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value=="")
      setForm({ ...form, [name]: value });
    if(name==="phone" && !(/^[0-9]+$/.test(value)) || (name==="phone" && value.length===11))
      return
    setForm({ ...form, [name]: value });
  };

  const handleOtpChange = (e) => {
    const otp= e.target.value;
    setOtp(otp);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(form.phone==="")
      setMsg("Enter your phone number");
    else if(verified===false)
      setMsg("Verify your number through OTP");
    else if(form.pwd==="")
      setMsg("Enter a password for your account");
    else if(!isStrong(form.pwd))
      setMsg("Enter a strong password");
    else if(form.cpwd==="")
      setMsg("Confirm your password by retyping");
    else if(form.pwd!==form.cpwd)
      setMsg("Confirm your password as it is mismatching");
    else
    {
      const response= await axios.post(`${origin}/register-user`,{phone:form.phone,pwd:form.pwd});
      setMsg(response.data.message);
      if(response.data.success===true)
          setTimeout(()=>navigate('/signin'),2000);
    }
  };

  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    try
    {
      const response = await axios.post(`${origin}/verify-otp`, { number: form.phone, otp });
      setMsg(response.data.message); 
      if(response.data.success===true)
        setVerified(true);
      else  
        setOtp("");
      setOtpBox(false);
    }   
    catch (error) 
    {
      setMsg('Error in connecting to server !');
    }
  };  

  const handleVerify = async (e) => {
    e.preventDefault();
    if(form.phone==="")
      setMsg("Enter your phone number");
    else if(form.phone.length!=10)
      setMsg("Invalid phone number");
    else
    {
      try 
      {
        const response = await axios.post(`${origin}/send-otp`, { number: form.phone });
        if(response.data===false)
          setMsg("The Phone number is already registered !"); 
        else
        {
          setMsg(response.data); 
          setOtpBox(true);
        }
      } 
      catch (error) 
      {
        setMsg('Error in sending OTP. Please try again !');
      }
    }
  };  

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
          <p className='nerko-one-regular text-5xl text-[#347928] font-bold text-center pb-10'> Create your new Account here</p>
          <form className="bg-[#FCCD2A] rounded-xl sm:w-4/5 w-full">
            <center>
              <p className="bg-[#347928] rounded-t-xl text-white p-3 text-center font-bold text-2xl md:text-3xl shadow-lg shadow-black">
                Sign Up
              </p>

              <div className="my-3 p-2">
                <div className="my-4">
                  <label className={lableStyle}>Your Phone Number</label><br />
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} className={inputBoxStyle} required/><br />
                  {otpBox && (
                    <div>
                      <input type="text" className={inputBoxStyle} placeholder='Enter your OTP here' value={otp} onChange={handleOtpChange} required/><br />
                      <button className='rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-1 text-md md:text-xl text-white transition-all duration-300 mt-3' onClick={handleOtpSubmit}>
                        Submit OTP
                      </button>
                    </div>
                  )}
                  {(!otpBox && !verified) && (
                    <Link className='text-black hover:underline text-lg font-bold' onClick={handleVerify}>
                      Verify
                      <br />
                    </Link>
                  )}
                  {(!otpBox && verified) && (
                    <p className="text-[#347928] bg-transparent p-1 text-center font-bold text-lg"> Phone number Verified </p>
                  )}
                </div>

                <div className="my-4">
                  <label className={lableStyle}>Set Your Password</label><br />
                  <input type="password" name="pwd" value={form.pwd} onChange={handleChange} className={inputBoxStyle} required/>
                </div>

                <div className="my-4">
                  <label className={lableStyle}>Confirm Your Password</label><br />
                  <input type="password" name="cpwd" value={form.cpwd} onChange={handleChange} className={inputBoxStyle} required/>
                </div>
              </div>

              <div className='my-2 text-lg text-red-600 font-bold'>
                {msg}
              </div>

              <button className="rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-2 text-lg md:text-xl text-white transition-all duration-300 mb-2" onClick={handleSubmit}>
                Sign Up
              </button>

              <div className='mb-4'>
                  <p className="text-sm">Already have an account? Then</p>
                  <Link to="/signin" className="text-black hover:underline text-lg font-bold">Sign In</Link>
              </div>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
