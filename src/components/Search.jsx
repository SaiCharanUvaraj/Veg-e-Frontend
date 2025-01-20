import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import origin from '../utilities/Origin';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [items, setItems] = useState([]); 
    const [itemDetails,setItemDetails]=useState(null);
    const [suggestionBox, setSuggestionBox] = useState(false); 
    const [suggestions, setSuggestions] = useState([]); 
    const [search, setSearch] = useState(""); 
    const [isClickingSuggestion, setIsClickingSuggestion] = useState(false);
    const [msg,setMsg]=useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => { 
            const response = await axios.get(`${origin}/fetch-items-info`);
            setItemDetails(response.data.data);
            const fetchedItems=response.data.data.map((item)=> item.item);
            setItems(fetchedItems); 
        }; 
        fetchItems(); 
    }, []);

    const handleFocus = () => {
        setSuggestionBox(true);
    }
    const handleBlur = () => { 
        if (!isClickingSuggestion) 
            setSuggestionBox(false); 
    };
    const handleChange = (e) => {
        setMsg("");
        const word = e.target.value; 
        setSearch(word); 
        if (word === "") 
            setSuggestions([]); 
        else 
            setSuggestions(items.filter(item => item.toLowerCase().startsWith(word.toLowerCase())).slice(0, 3));
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if(search==="")
            return;
        const trimmedSearch = search.trim().toLowerCase();
        if (items.some(item => item === trimmedSearch)) 
        {
            const itemObject = itemDetails.find(obj => obj.item === trimmedSearch);
            const type= itemObject.type;
            switch (type) 
            {
                case "fruit":
                    navigate("/fruits",{ state: { selectedItem: itemObject } });
                    break;
                case "vegetable":
                    navigate("/vegetables",{ state: { selectedItem: itemObject } });
                    break;
                case "dairy":
                    navigate("/dairies",{ state: { selectedItem: itemObject } });
                    break;
                default:
                    console.error(`Invalid type: ${type}`);
            }
        } 
        else 
            setMsg("The item is not available");
    };
    
    const handleSuggestionClick = (item) => {
        setSearch(item); 
        setSuggestionBox(false);
    };

    return (
        <div className='grid place-items-center' onFocus={handleFocus} onBlur={handleBlur}>
            <form className="grid place-items-center gap-2 md:w-2/3 w-5/6" onSubmit={handleSearch}>
                <input type="text" name="search" placeholder="Search items..." value={search} onChange={handleChange} className="w-full h-12 text-lg p-2 rounded-full transition-all duration-300 border-black focus:scale-105 px-5"/>
            </form>
            <p className='w-full m-2 text-center text-md font-semibold'>{msg}</p>
            {(suggestionBox && suggestions.length !== 0) && 
                <div className='grid place-items-start md:w-2/3 w-5/6 gap-3 mt-5 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg text-black p-1 scale-105'>
                    <p className='w-full text-center text-md font-semibold'>Suggestions</p>
                    {suggestions.map((item, index) => (
                        <Link key={index} onMouseDown={() => setIsClickingSuggestion(true)} onMouseUp={() => setIsClickingSuggestion(false)} onClick={() => handleSuggestionClick(item)} className='hover:bg-white/50 hover:backdrop-blur-2xl p-2 w-full rounded-lg text-md font-semibold'>{item}</Link>
                    ))}
                </div>
            }
        </div>
    );
};
export default Search;