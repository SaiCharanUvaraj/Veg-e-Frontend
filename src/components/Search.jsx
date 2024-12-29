import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const [items,setItems]=useState([])
    const [suggestionBox, setSuggestionBox] = useState(false);
    const [suggestions,setSuggestions]=useState([])

    useEffect(()=>{
        const fetchItems = async() =>{
            const response= await axios.get("http://localhost:3000/fetch-items");
            setItems(response.data)
        }
        fetchItems()
    },[])

    const toggleSuggestionBox =() =>{
        setSuggestionBox(!suggestionBox);
        setSuggestions([]);
    }

    const handleChange =(e) =>{
        const search =e.target.value;
        if(search==="")
        {
            setSuggestions([]);
            return
        }
        setSuggestions(items.filter(item => item.startsWith(search)));
    }

    const handleSearch =(e) =>{
        e.preventDefault();
    }

    return (
    <div className='grid place-items-center'>
        <form className="grid place-items-center gap-2 md:w-2/3 w-5/6" onFocus={toggleSuggestionBox} onBlur={toggleSuggestionBox} onSubmit={handleSearch}>
            <input type="text" name="search" placeholder="Search items..." onChange={handleChange} className="w-full h-12 text-lg p-2 rounded-full transition-all duration-300 border-black focus:scale-105 px-5"/>
        </form>
        {(suggestionBox && suggestions.length!==0) && 
            <div className='grid place-items-start md:w-2/3 w-5/6 gap-3 mt-5 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-1 z-40 scale-105'>
                <p className='w-full text-center text-md font-semibold'>Suggestions</p>
                {suggestions.map((item, index) => (
                    <Link key={index} className='hover:bg-white/50 hover:backdrop-blur-2xl p-2 w-full rounded-lg text-md font-semibold'>{item}</Link> 
                ))}
            </div>
        }
    </div>

  )
}

export default Search

/*
<button type="submit" className='active:scale-95 hover:scale-110 transition-all duration-300'>
                <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </button>*/