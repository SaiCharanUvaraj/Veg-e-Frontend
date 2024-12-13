import React from 'react'

const Search = () => {
    const handleSearch = (e) =>{
        e.preventDefault();
    }
    return (
    <div className='flex justify-center items-center'>
        <form onSubmit={handleSearch} className="grid place-items-center gap-2 md:w-2/3 w-5/6">
            <input type="text" name="search" placeholder="Search items..." className="w-full h-12 text-lg p-2 rounded-lg transition-all duration-300 border-black border-2 focus:scale-105"/>
            <button type="submit" className='active:scale-95 hover:scale-110 transition-all duration-300'>
                <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </form>
    </div>
  )
}

export default Search