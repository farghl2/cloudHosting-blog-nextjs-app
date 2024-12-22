"use client"

import axios from "axios";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify";

function LogoutBtn() {
    const router = useRouter();
    const logoutHandler = async()=>{
        try {
            await axios.get(`${process.env.API_URL}/users/logout`);
            router.push('/');
            router.refresh();
        } catch (error) {
           return toast.warning('somthing went wrong');
            console.log(error);
        }

    }
  return (
    <button onClick={logoutHandler} 
    className="bg-gray-700 text-gray-200 px-1 rounded"
    >
        Logout
    </button>
  )
}

export default LogoutBtn