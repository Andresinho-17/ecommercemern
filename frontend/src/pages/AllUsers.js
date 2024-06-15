import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUser,setAllUsers] = useState([]) 
  const [openUpdateRole,setOpenUpdateUser] = useState(false)
  const [updateUserDetails,setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async()=>{
    
    const fetchData = await fetch(SummaryApi.allUser.url,{
      method : SummaryApi.allUser.method,
      credentials: "include"
    })

    const dataResponse = await fetchData.json()


    if(dataResponse.success){ 
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }

  useEffect(()=>{
    fetchAllUsers()
    //console.log(allUser)
  },[])

  return (
    <div>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>SR</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Create Data</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LLLL')}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                    onClick={()=>{
                      setUpdateUserDetails(el)
                      setOpenUpdateUser(true)
                    }}
                    >
                      <MdModeEdit/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
        <ChangeUserRole onClose={()=>setOpenUpdateUser(false)}
        name={updateUserDetails.name}
        email={updateUserDetails.email}
        role={updateUserDetails.role}
        userId={updateUserDetails._id}
        callFunc={fetchAllUsers}
        />
        )
      }
    </div>
  )
}

export default AllUsers
