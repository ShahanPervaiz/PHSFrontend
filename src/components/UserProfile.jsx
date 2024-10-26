import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Button } from '.'
import { userProfileData } from '../data/dummy'
import { MdOutlineCancel } from 'react-icons/md'
import { AiOutlineLogout } from "react-icons/ai";
import avatar from '../data/avatar.jpg'

const UserProfile = () => {
    const { currentColor } = useStateContext()
     // Retrieve user data from localStorage
     const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="nav-item right-1 top-16 absolute bg-white dark:bg-[#42464D] p-2 md:w-15 hover:bg-light-gray">
        <div className="justify-between flex items-center">
            <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
            <Button
                icon={<MdOutlineCancel />}
                color='rgb(153, 171, 180)'
                bgHoverColor='light-gray'
                size='2xl'
                borderRadius='50%'
            />
        </div>
        <div className="flex gap-3 items-center mt-2 border-color">
            <img
                className="rounded-full h-12 w-12"
                src={avatar}
                alt="user-profile"
            />
            <div>
                    {/* Display the user's name and email */}
                    <p className="font-semibold text-xl text-gray-200">{user?.name}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400">{user?.role}</p>
                    <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user?.email}</p>
            </div>
        </div>
        <div>
            {/* {userProfileData.map((item, index) => 
            <div key={index} className='flex gap-3 border-color p-1 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]'>
                <button
                    type='button'
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className='text-xl rounded-lg p-3 hover:bg-light-gray'
                >
                    {item.icon}
                </button>
    
                <div>
                    <p className='font-semibold dark:text-gray-200'>{item.title}</p>
                    <p className='text-gray-500 text-sm dark:text-gray-400'>{item.desc}</p>
                </div>
            </div>
            )} */}
        </div>
        <hr />
        <div className="justify-between flex items-center mt-2 hover:bg-light-gray">
            <p className="font-semibold text-lg dark:text-gray-200 p-2">Log-out</p>
            <Button
                icon={<AiOutlineLogout />}
                color='rgb(153, 171, 180)'
                bgHoverColor='light-gray'
                size='2xl'
                borderRadius='50%'
            />
        </div>
    </div>
    
    )
}

export default UserProfile