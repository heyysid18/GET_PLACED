import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Search Results</h1>
                    <p className='text-gray-600'>
                        Found <span className='font-semibold text-[#6A38C2]'>{allJobs.length}</span> job{allJobs.length !== 1 ? 's' : ''} matching your search
                    </p>
                </div>
                {allJobs.length === 0 ? (
                    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center'>
                        <div className='mb-4'>
                            <svg className='mx-auto h-16 w-16 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                            </svg>
                        </div>
                        <p className='text-gray-500 text-lg font-medium mb-2'>No jobs found</p>
                        <p className='text-gray-400 text-sm'>Try adjusting your search terms or browse all available jobs</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            allJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse