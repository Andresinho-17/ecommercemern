import React, { useEffect } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ProfileUser = () => {
  const user = useSelector(state => state?.user?.user)

  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include"
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error fetching users.");
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center'>
        <div className='text-3xl relative flex justify-center mb-4'>
          {
            user?.profilePic ? (
              <img src={user?.profilePic} className='w-40 h-40 rounded-full' alt={user?.name} />
            ) : (
              <FaRegCircleUser className='w-40 h-40' />
            )
          }
        </div>
        <ul className='bg-white shadow-md rounded-lg p-4 w-full max-w-sm'>
          <li className='mb-2'>
            <span className='font-bold'>Nombre:</span>{user?.name}
          </li>
          <li className='mb-2'>
            <span className='font-bold'>Correo:</span> {user?.email}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileUser;

