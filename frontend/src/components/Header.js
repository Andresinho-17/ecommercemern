import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-green-300'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50}/>
                    </Link>
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 hiver: bg-white'>
                    <input type='text' placeholder='Buscar producto' className='w-full outline-none' />
                    <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
                        <GrSearch/>
                    </div>
                </div>

                <div className='flex items-center gap-7'>
                    <div className='text-3xl cursor-pointer'>
                        <FaRegCircleUser/>
                    </div>
                    <div className='text-2xl relative'>
                        <span><FaShoppingCart/></span>
                        <div className='bg-red-600 text-white w-5 p-1 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                            <p className='text-sm'>0</p>
                        </div>
                    </div>

                    <div>
                        <Link to={"/login"} className='px-2 py-1 rounded-full text-white bg-black hover:bg-white hover:text-black'>Login</Link>
                    </div>


                </div>
        </div>
    </header>
  )
}

export default Header
