import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT, getProfilePhotoUrl } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <Link to="/">
                        <h1 className='text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity'>Job<span className='text-[#6A38C2]'>Portal</span></h1>
                    </Link>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-gray-700 hover:text-[#6A38C2] transition-colors duration-200'>Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login"><Button variant="outline" className='hover:bg-gray-50'>Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg transition-all duration-200">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-gray-200 hover:ring-[#6A38C2] transition-all duration-200">
                                        <AvatarImage src={getProfilePhotoUrl(user?._id)} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                    <div className='space-y-4'>
                                        <div className='flex gap-3 items-center pb-3 border-b'>
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={getProfilePhotoUrl(user?._id)} alt={user?.fullname} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500'>{user?.profile?.bio || 'No bio available'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile">
                                                        <Button variant="ghost" className='w-full justify-start gap-2 hover:bg-gray-100'>
                                                            <User2 className='h-4 w-4' />
                                                            <span>View Profile</span>
                                                        </Button>
                                                    </Link>
                                                )
                                            }

                                            <Button onClick={logoutHandler} variant="ghost" className='w-full justify-start gap-2 hover:bg-red-50 hover:text-red-600'>
                                                <LogOut className='h-4 w-4' />
                                                <span>Logout</span>
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar