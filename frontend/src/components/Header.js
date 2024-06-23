import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/roles'
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const [contactDisplay,setContactDisplay]= useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() =>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
        method : SummaryApi.logout_user.method,
        credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
        toast.success(data.message)
        dispatch(setUserDetails(null))
    }

    if(data.error){
        toast.error(data.message)
    }
  }
  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-green-300'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50}/>
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 hiver: bg-white'>
                    <input type='text' placeholder='Buscar producto' className='w-full outline-none' onChange={handleSearch} value={search}/>
                    <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch/>
                    </div>
                </div>

                <div className='flex items-center gap-7'>
                    
                    <div className='relative flex justify-center' >
                        {
                            user?._id &&(
                                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profilePic ? (
                                            < img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                                        ) : (
                                            <FaRegCircleUser/>
                                        )
                                    }
    
                                </div>
                            )
                        }
                        
                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-4 mb-7 shadow-lg rounded'>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>admin panel</Link>
                                            )
                                        }
                                    </nav>
                                    <div className='mt-4 mb-4'>
                                        <nav>
                                            {
                                            
                                                <Link to={"/ProfileUser"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>perfil</Link>
                                            
                                            }
                                        </nav>
                                    </div>   
                                </div>
                            )
                        }              
                    </div>
                        {
                            user?._id&& (
                                <Link to={"/cart"} className='text-2xl relative'>
                                    <span><FaShoppingCart/></span>
                
                                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                        <p className='text-sm'>{context?.cartProductCount}</p>
                                    </div>
                                </Link>
                            )
                        }
                    
                    <div className='text-2xl cursor-pointer relative flex justify-center' onClick={()=>setContactDisplay(preve => !preve)}>
                        <h2>Contáctenos</h2>
                        {
                            contactDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-4 mb-7 shadow-lg rounded'>
                                    <nav>
                                        {
                                            <Link to='https://wa.me/3218015677' target='_blank' rel='noopener noreferrer' className='flex items-start mt-4 mb-4'>
                                            <FaWhatsapp className='text-green-500 hover:text-green-700 mr-2' />
                                            WhatsApp
                                          </Link>
                                        }
                                    </nav>
                                    <div>
                                        <nav>
                                            <Link to='mailto:marlopiedtahita@gmail.com' target='_blank' rel='noopener noreferrer' className='flex items-start mt-4 mb-4'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 hover:text-green-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm14 2l-7 5-7-5h14zm0 8H3v-5l7 4 7-4v5z" clip-rule="evenodd" />
                                                </svg>
                                                Correo Electrónico
                                            </Link>
                                        </nav>
                                    </div>
                                </div>
                            ) 
                        }            
                    </div>
                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-2 py-1 rounded-full text-black bg-white hover:bg-black hover:text-white'>Cerrar Sesión</button>
                            )
                            : (
                                <Link to={"/login"} className='px-2 py-1 rounded-full text-white bg-black hover:bg-white hover:text-black'>Login</Link>
                            )
                        }
                    </div>
                </div>
        </div>
    </header>
  )
}

export default Header