import React, { useState } from 'react'
import LoginIcons from '../assest/signin.gif'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Login = () => {
    const[showPassword,setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (e) =>{
        const  {name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name]: value 
            }
        })
    }

    const handlesubmit= async(e)=>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)
    
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto '>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <img src={LoginIcons} alt='Login icons'/>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>
                    <div className='grid'>
                        <label>Correo</label>
                        <div className='bg-slate-100 p-2 rounded-xl'>
                            <input 
                                type='email'
                                placeholder='Ingrese correo'
                                name='email'
                                value={data.email}
                                onChange={ handleOnChange}
                                className='w-full h-full outline-none bg-transparent p-2'/>
                        </div>
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <div  className='bg-slate-100 flex p-2 rounded-xl'>
                            <input
                                type={showPassword ?"text" : "password"} 
                                placeholder='Ingrese contraseña'
                                name='password'
                                value={data.password}
                                onChange={ handleOnChange}
                                className='w-full h-full outline-none bg-transparent p-2'/>

                            <div className='cursor-pointer text-xl lg:flex items-center' onClick={()=>setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash/>
                                        )
                                        :
                                        (
                                            <IoEyeSharp/> 
                                        )
                                    }
                                </span>
                            </div>
                        </div>

                        <Link to={'/ForgotPassword'} className='block w-fit ml-auto hover:underline'>
                            Olvido contraseña
                        </Link>
                    </div>

                    <button className='bg-green-300 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Iniciar </button>
                </form>
                <p className='m-3'>No tienes una cuenta aun? <Link to={"/sign-up"}className="text-green-700 hover:underline">Crear cuenta</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login
