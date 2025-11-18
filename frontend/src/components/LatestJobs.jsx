import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-bold mb-3'>
                    <span className='text-[#6A38C2]'>Latest & Top </span> 
                    <span className='text-gray-900'>Job Openings</span>
                </h1>
                <p className='text-gray-600 text-lg'>Discover the most recent opportunities from leading companies</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full text-center py-12'>
                            <p className='text-gray-500 text-lg'>No jobs available at the moment. Check back later!</p>
                        </div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs