import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-gradient-to-b from-gray-50 to-white py-16'>
            <div className='flex flex-col gap-6 max-w-4xl mx-auto px-4'>
                <span className='mx-auto px-4 py-2 rounded-full bg-[#6A38C2]/10 text-[#6A38C2] font-semibold text-sm border border-[#6A38C2]/20'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
                    Search, Apply & <br /> 
                    Get Your <span className='text-[#6A38C2]'>Dream Job</span>
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover thousands of job opportunities from top companies. Find the perfect role that matches your skills and aspirations.
                </p>
                <div className='flex w-full max-w-2xl mx-auto shadow-xl border-2 border-gray-200 rounded-full items-center gap-2 bg-white hover:border-[#6A38C2]/30 transition-all duration-300 focus-within:border-[#6A38C2] focus-within:shadow-2xl'>
                    <input
                        type="text"
                        placeholder='Search for jobs, companies, or skills...'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full px-6 py-4 rounded-full text-gray-700 placeholder-gray-400'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 py-4 m-1 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Search className='h-5 w-5 mr-2' />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection