import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector, useDispatch } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { setAllJobs, setAllAdminJobs } from '@/redux/jobSlice'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                // Refetch all jobs (for students) and admin jobs (for admin view) to update the lists
                try {
                    const [allJobsRes, adminJobsRes] = await Promise.all([
                        axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true}),
                        axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true})
                    ]);
                    if(allJobsRes.data.success){
                        dispatch(setAllJobs(allJobsRes.data.jobs));
                    }
                    if(adminJobsRes.data.success){
                        dispatch(setAllAdminJobs(adminJobsRes.data.jobs));
                    }
                } catch (error) {
                    console.log("Error refetching jobs:", error);
                }
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Post New Job</h1>
                    <p className='text-gray-600'>Fill in the details below to create a new job posting</p>
                </div>
                <form onSubmit = {submitHandler} className='bg-white p-8 rounded-lg shadow-md border border-gray-200'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <Label className='text-gray-700 font-semibold mb-2 block'>Job Title *</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                placeholder="e.g., Senior Software Engineer"
                                className="focus-visible:ring-[#6A38C2] focus-visible:ring-2"
                            />
                        </div>
                        <div>
                            <Label className='text-gray-700 font-semibold mb-2 block'>Description *</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Brief job description"
                                className="focus-visible:ring-[#6A38C2] focus-visible:ring-2"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div> 
                    {
                        companies.length === 0 && (
                            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
                                <p className='text-sm text-red-700 font-semibold text-center'>
                                    ⚠️ Please register a company first before posting a job
                                </p>
                            </div>
                        )
                    }
                    {
                        loading ? (
                            <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Posting Job...
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg transition-all"
                                disabled={companies.length === 0}
                            >
                                Post New Job
                            </Button>
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob