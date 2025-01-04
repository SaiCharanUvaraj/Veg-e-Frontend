import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import origin from "../utilities/Origin";
import axios from "axios";
import Loader from "../components/Loader";

// ProfileCompletion component handles user profile creation during the signup process
const ProfileCompletion = () => {
    // CSS classes for consistent styling
    const inputBoxStyle = "rounded-lg mt-2 md:w-3/4 w-full focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2";
    const lableStyle = "text-xl font-bold text-[#347928]";

    // Extracting location state to retrieve phone and password from the previous step
    const location = useLocation();
    const state = location.state || {};
    const phone = state.phone || "";
    const pwd = state.pwd || "";

    // State variables
    const [msg, setMsg] = useState(""); // Message to show status or errors
    const [form, setForm] = useState("open"); // Tracks form state: open, close, or over
    const [loading, setLoading] = useState(false); // Loader visibility
    const [formState, setFormState] = useState({
        fname: "",
        lname: "",
        dob: "",
        plot: "",
        road: "",
        locality: "",
        city: "",
        state: "",
        pin: "",
    });

    // Ensures the form is only accessible if phone and password are provided
    useEffect(() => {
        if (pwd === "" && phone === "") {
            setForm("close");
        }
    }, [pwd, phone]);

    // Handles input changes for the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent invalid input for pincode field
        if (name === "pin" && (!/^[0-9]+$/.test(value) || value.length === 7)) {
            return;
        }

        // Update form state
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handles form submission for profile completion
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("Signing you up and creating your profile...");

        try {
            // Register user with phone and password
            const response1 = await axios.post(`${origin}/register-user`, { phone, pwd });

            // Prepare profile data
            const formData = {
                phone,
                name: {
                    fname: formState.fname,
                    lname: formState.lname,
                },
                dob: new Date(formState.dob),
                address: {
                    plot: formState.plot,
                    road: formState.road,
                    locality: formState.locality,
                    city: formState.city,
                    state: formState.state,
                    pin: formState.pin,
                },
            };

            // Create user profile
            const response2 = await axios.post(`${origin}/create-profile`, formData);

            // Update form state based on success
            if (response1.data.success === true && response2.data.success === true) {
                setForm("over");
            } else {
                setMsg("Error in signing up and creating your profile. Please try again!");
            }
        } catch (error) {
            setMsg("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid place-items-center">
            {/* Header section for navigation and title */}
            {form === "open" && (
                <div className="bg-white/30 backdrop-blur-md shadow-2xl z-50 rounded-b-xl fixed w-full top-0 left-0 right-0 p-2 flex space-x-10">
                    <Link to="/signup">
                        <button className="bg-[#347928] p-2 text-white rounded-lg hover:scale-110 active:scale-95 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                    </Link>
                    <p className="nerko-one-regular text-4xl text-[#347928] font-bold text-center">
                        Complete your profile to create your account
                    </p>
                </div>
            )}

            {/* Form section for profile completion */}
            {form === "open" && (
                <form className="bg-[#C0EBA6] p-5 rounded-xl sm:w-3/4 lg:w-2/4 w-full mt-28 mx-2 mb-16" onSubmit={handleSubmit}>
                    <center>
                        {/* First Name Field */}
                        <div className="my-8">
                            <label className={lableStyle}>First Name</label><br />
                            <input type="text" name="fname" value={formState.fname} onChange={handleChange} className={inputBoxStyle} required /><br />
                        </div>

                        {/* Last Name Field */}
                        <div className="my-8">
                            <label className={lableStyle}>Last Name</label><br />
                            <input type="text" name="lname" value={formState.lname} onChange={handleChange} className={inputBoxStyle} required /><br />
                        </div>

                        {/* Date of Birth Field */}
                        <div className="my-8">
                            <label className={lableStyle}>Date of Birth</label><br />
                            <input type="date" name="dob" value={formState.dob} onChange={handleChange} className="rounded-lg mt-2 w-2/4 focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2" required /><br />
                        </div>

                        {/* Phone Number (Read-only) */}
                        <div className="my-8">
                            <label className={lableStyle}>Phone Number</label><br />
                            <input type="text" name="phone" value={phone} disabled className="rounded-lg mt-2 w-2/4 focus:scale-105 text-lg h-10 transition-all duration-300 text-center p-2" /><br />
                        </div>

                        {/* Address Fields */}
                        <div className="my-8">
                            <p className={lableStyle}>Shipping Address</p>
                            <p className="text-lg">(Be correct in giving address and pincode)</p>
                            <div>
                                {["plot", "road", "locality", "city", "state", "pin"].map((field) => (
                                    <div key={field} className="my-3">
                                        <label className={lableStyle}>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
                                        <input type="text" name={field} value={formState[field]} onChange={handleChange} className={inputBoxStyle} required /><br />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="rounded-lg bg-[#347928] hover:scale-110 active:scale-95 p-2 text-lg md:text-xl text-white transition-all duration-300 mb-2">
                            Save Profile
                        </button>

                        {/* Status Message */}
                        <div className={lableStyle}>{msg}</div>

                        {/* Loader */}
                        <div>{loading && <Loader />}</div>
                    </center>
                </form>
            )}

            {/* Error State */}
            {form === "close" && (
                <div className="mt-28 grid place-items-center">
                    <p className="nerko-one-regular text-4xl text-[#347928] font-bold text-center">Please complete your Signup process before profile completion</p>
                    <Link className="text-xl font-bold text-black" to="/signup">Sign Up</Link>
                </div>
            )}

            {/* Success State */}
            {form === "over" && (
                <div className="mt-28 grid place-items-center">
                    <p className="nerko-one-regular text-4xl text-[#347928] font-bold text-center">Signed up successfully and your profile was saved</p>
                    <Link className="text-xl font-bold text-black" to="/signin">Sign In</Link>
                </div>
            )}
        </div>
    );
};

export default ProfileCompletion;