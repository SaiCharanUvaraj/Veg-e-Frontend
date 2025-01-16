import ClipLoader from "react-spinners/ClipLoader";
import React from 'react'

const Loader = () => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderWidth: "5px",
    };
    return (
    <div className='my-2'>
        <ClipLoader cssOverride={override} size={30}/>
    </div>
  )
}

export default Loader