import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import origin from '../utilities/Origin';

const Search = () => {
    // State variables for items, suggestions, and suggestion box visibility
    const [items, setItems] = useState([]);
    const [suggestionBox, setSuggestionBox] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    // Fetch items from the server when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get(`${origin}/fetch-items`);
            setItems(response.data); // Set fetched items to state
        }
        fetchItems(); // Call the fetch function
    }, []);

    // Toggle the visibility of the suggestion box
    const toggleSuggestionBox = () => {
        setSuggestionBox(!suggestionBox);
        setSuggestions([]); // Clear suggestions when toggling the box
    }

    // Handle the search input change and filter suggestions
    const handleChange = (e) => {
        const search = e.target.value;
        if (search === "") {
            setSuggestions([]); // Clear suggestions if search is empty
            return;
        }
        // Filter items based on the search input
        setSuggestions(items.filter(item => item.toLowerCase().startsWith(search.toLowerCase())));
    }

    // Handle form submission (no action required in this case)
    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <div className='grid place-items-center'>
            <form className="grid place-items-center gap-2 md:w-2/3 w-5/6" onFocus={toggleSuggestionBox} onBlur={toggleSuggestionBox} onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Search items..." onChange={handleChange} className="w-full h-12 text-lg p-2 rounded-full transition-all duration-300 border-black focus:scale-105 px-5"/>
            </form>
            {/* Render suggestion box if suggestions are available */}
            {(suggestionBox && suggestions.length !== 0) && 
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
