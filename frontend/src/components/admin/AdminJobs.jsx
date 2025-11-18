import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Manage Jobs</h1>
            <p className='text-gray-600'>Create and manage your job postings</p>
          </div>
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg transition-all"
          >
            + Post New Job
          </Button>
        </div>
        <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
          <div className='mb-4'>
            <Input
              className="max-w-md"
              placeholder="Search jobs by title or company name..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs