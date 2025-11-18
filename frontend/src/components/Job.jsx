import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { getCompanyLogoUrl } from '@/utils/constant'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-xl hover:border-[#6A38C2]/30 transition-all duration-300 group'>
            <div className='flex items-center justify-between mb-4'>
                <span className='text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </span>
                <Button variant="ghost" className="rounded-full hover:bg-gray-100" size="icon">
                    <Bookmark className='h-4 w-4 text-gray-400 group-hover:text-[#6A38C2] transition-colors' />
                </Button>
            </div>

            <div className='flex items-center gap-3 mb-4'>
                <div className="p-2 rounded-lg border border-gray-200 bg-gray-50">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={getCompanyLogoUrl(job?.company?._id)} alt={job?.company?.name} />
                    </Avatar>
                </div>
                <div>
                    <h2 className='font-semibold text-base text-gray-900'>{job?.company?.name || 'Company'}</h2>
                    <p className='text-sm text-gray-500'>{job?.location || 'India'}</p>
                </div>
            </div>

            <div className='mb-4'>
                <h1 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-[#6A38C2] transition-colors'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            
            <div className='flex flex-wrap items-center gap-2 mb-4'>
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
            
            <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className='flex-1 hover:bg-gray-50 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all'
                >
                    View Details
                </Button>
                <Button 
                    className="flex-1 bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg transition-all"
                >
                    Save Job
                </Button>
            </div>
        </div>
    )
}

export default Job