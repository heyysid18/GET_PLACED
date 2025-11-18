import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='p-6 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer hover:shadow-xl hover:border-[#6A38C2]/30 transition-all duration-300 group h-full'
        >
            <div className='mb-4'>
                <h2 className='font-semibold text-base text-gray-900'>{job?.company?.name || 'Company'}</h2>
                <p className='text-sm text-gray-500 mt-1'>{job?.location || 'India'}</p>
            </div>
            <div className='mb-4'>
                <h1 className='font-bold text-lg text-gray-900 my-2 group-hover:text-[#6A38C2] transition-colors'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <Badge className='bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1'>
                    {job?.position} Position{job?.position !== 1 ? 's' : ''}
                </Badge>
                <Badge className='bg-red-50 text-red-700 border-red-200 font-semibold px-3 py-1'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 border-purple-200 font-semibold px-3 py-1'>
                    ₹{job?.salary}LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards