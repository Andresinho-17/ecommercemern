import React, { useState } from 'react'
import LoginIcons from '../assest/signin.gif'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const[showPassword,setShowPassword] =useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic : "",
    })

    const navigate = useNavigate()

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        
        const imagePic = await imageTobase64(file)
        
        setData((preve)=>{
          return{
            ...preve,
            profilePic : imagePic
          }
        })
    
      }

    const handleOnChange = (e) =>{
        const  {name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name]: value 
            }
        })
    }

    const handlesubmir=async(e)=>{
        e.preventDefault();

        if(data.password === data.confirmPassword){
            
            const dataResponse = await fetch("http://localhost:8080/api/signup",{
                method: SummaryApi.SignUP.method,
                headers : {
                    "Content-Type": "application/json", 
                },
                body : JSON.stringify(data)
            })
    
            
    
            const dataApi = await dataResponse.json()

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error){
                toast.error(dataApi.message)
            }
        }else{
            toast.error("las contraseñas no coinciden")
        }

        
    }

    console.log("data login",data)
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-2 py-5 w-full max-w-sm mx-auto '>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || LoginIcons} alt='Login icons'/>
                    </div>
                    <form>
                    <label>
                        <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                            Upload  Photo
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handlesubmir}>
                    <div className='grid'>
                            <label>Nombre</label>
                            <div className='bg-slate-100 p-2 rounded-xl'>
                                <input 
                                    type='text'
                                    placeholder='Ingrese su nombre'
                                    name='name'
                                    value={data.name}
                                    onChange={ handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent p-2'/>
                            </div>
                    </div>
                    <div className='grid'>
                        <label>Correo</label>
                        <div className='bg-slate-100 p-2 rounded-xl'>
                            <input 
                                type='email'
                                placeholder='Ingrese correo'
                                name='email'
                                value={data.email}
                                onChange={ handleOnChange}
                                required
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
                                required
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
                    </div>
                    <div>
                        <label>Confirmar Contraseña</label>
                        <div  className='bg-slate-100 flex p-2 rounded-xl'>
                            <input
                                type={showConfirmPassword ?"text" : "password"} 
                                placeholder='Ingrese contraseña'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={ handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent p-2'/>

                            <div className='cursor-pointer text-xl lg:flex items-center' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showConfirmPassword ? (
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
                    </div>

                    <button className='bg-green-300 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Crear Cuenta </button>
                </form>
                <p className='m-3'>¿Ya tiene cuenta?  <Link to={"/login"}className="text-green-700 hover:underline">Iniciar Sesion</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp
