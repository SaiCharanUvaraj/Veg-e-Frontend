import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import origin from '../utilities/Origin';

const Search = () => {
    const [items,setItems]=useState([])
    const [suggestionBox, setSuggestionBox] = useState(false);
    const [suggestions,setSuggestions]=useState([])

    useEffect(()=>{
        const fetchItems = async() =>{
            const response= await axios.get(`${origin}/fetch-items`);
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
        setSuggestions(items.filter(item => item.toLowerCase().startsWith(search.toLowerCase())));
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

export default Search;