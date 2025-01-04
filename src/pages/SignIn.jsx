import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VegeInfo from '../components/VegeInfo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import origin from '../utilities/Origin';
import Loader from '../components/Loader';

const SignIn = () => {
  // State variables for form data, messages, OTP, loading, and forgot password flow
  const [form, setForm] = useState({ phone: "", pwd: "" });
  const [msg, setMsg] = useState("");
  const [forgot, setForgot] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Styling for input boxes and labels
  const inputBoxStyle = "rounded-lg mt-2 w-5/6 focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2";
  const lableStyle = "text-lg font-semibold";

  // Handle input field changes and update the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle the Sign-In form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure both phone number and password are provided
    if (form.phone === "" || form.pwd === "") {
      setMsg("Enter your registered phone number and password.");
      return;
    }

    setLoading(true); // Show loader
    setMsg("Signing into your account...");

    try {
      // Send a POST request to authenticate the user
      const response = await axios.post(`${origin}/auth-user`, { phone: form.phone, pwd: form.pwd });

      // Navigate to home if authentication is successful, else display the error message
      if (response.data.success === true) navigate('/home');
      else setMsg(response.data.message);
    } catch {
      setMsg('Error in signing into account. Please try again!');
    }
    setLoading(false); // Hide loader
  };

  // Handle OTP-based sign-in form submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure phone number and OTP are provided
    if (form.phone === "") setMsg("Enter your registered phone number");
    else if (otp === "") setMsg("Enter the OTP sent to your phone number");
    else {
      setLoading(true); // Show loader
      setMsg("Signing into your account...");

      try {
        // Send a POST request to verify the OTP
        const response = await axios.post(`${origin}/verify-forgot-otp`, { number: form.phone, otp });
        setMsg(response.data.message);

        // Navigate to home if OTP verification is successful
        if (response.data.success === true) navigate('/home');
        else setOtp(""); // Clear OTP input on failure
      } catch {
        setMsg('Error in verifying OTP. Please try again!');
      }
      setLoading(false); // Hide loader
    }
  };

  // Handle OTP input field changes
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle forgot password flow
  const forgotPwd = async () => {
    // Validation: Ensure a valid phone number is provided
    if (form.phone === "") setMsg("Enter your phone number");
    else if (form.phone.length !== 10) setMsg("Invalid phone number");
    else {
      setLoading(true); // Show loader

      try {
        // Send a POST request to initiate the forgot password process
        const response = await axios.post(`${origin}/forgot-password`, { number: form.phone });

        // Display appropriate message based on the response
        if (response.data === false) setMsg("The Phone number is not registered!");
        else {
          setForgot(true); // Switch to OTP-based sign-in flow
          setMsg(response.data);
        }
      } catch {
        setMsg('Error in sending OTP. Please try again!');
      }
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      {/* Main container with two columns */}
      <div className="grid md:grid-cols-2 grid-cols-1 h-screen gap-5">
        
        {/* Left section with VegeInfo component and back button */}
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

        {/* Right section with Sign-In form */}
        <div className="bg-[#C0EBA6] flex flex-col justify-center items-center py-10 px-2">
          <p className='nerko-one-regular text-5xl text-[#347928] font-bold text-center pb-10'> Get into your Account here</p>
          
          {/* Form container */}
          <form className="bg-[#FCCD2A] rounded-xl sm:w-4/5 w-full">
            <center>
              <p className="bg-[#347928] rounded-t-xl text-white p-3 text-center font-bold text-2xl md:text-3xl shadow-lg shadow-black">
                Sign In
              </p>
              <div className="my-3 p-4">
                {/* Phone number input */}
                <div className="my-4">
                  <label className={lableStyle}>Your Phone Number</label><br />
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} className={inputBoxStyle} />
                </div>

                {/* Conditional rendering for OTP input */}
                {forgot && (
                  <div>
                    <input type="text" className={inputBoxStyle} placeholder='Enter your OTP here' required value={otp} onChange={handleOtpChange} />
                    <br />
                  </div>
                )}

                {/* Conditional rendering for password input */}
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

              {/* Message display */}
              <div className='my-2 text-lg text-red-600 font-bold'>
                {msg}
              </div>

              {/* Loader display */}
              <div>
                {loading && <Loader />}
              </div>

              {/* Conditional rendering for submit button */}
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

              {/* Link to Sign-Up page */}
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