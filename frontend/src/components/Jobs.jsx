import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Browse Jobs</h1>
                    <p className='text-gray-600'>Find your perfect opportunity from {filterJobs.length} available positions</p>
                </div>
                <div className='flex gap-6'>
                    <div className='w-64 flex-shrink-0'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 flex items-center justify-center py-20'>
                                <div className='text-center'>
                                    <p className='text-gray-500 text-lg mb-2'>No jobs found</p>
                                    <p className='text-gray-400 text-sm'>Try adjusting your search or filters</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex-1 min-h-[calc(100vh-200px)]'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs