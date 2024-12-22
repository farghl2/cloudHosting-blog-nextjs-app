'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import { toast } from "react-toastify"

import { useRouter } from "next/navigation"
import axios from "axios"

const LoginForm = () => {
  const router = useRouter();
    const [login, setLogin] = useState({
        email:'',
        password:''
    })

    const formSubmitHandler =async(e:React.FormEvent)=>{
        e.preventDefault();
        if(login.email === "") return toast.error('email is Required')
        if(login.password === "") return toast.error('email is Required')
          try {
        await axios.post(`${process.env.API_URL}/users/login`, {email: login.email, password: login.password});
        router.replace('/');
        router.refresh();

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error:any) {
            toast.error(error?.response?.data.message)
            console.log(error)
          }




    }
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <CustomInput  placeholder="Enter your Email" type="email"
          value={login.email}
          onChange={(e)=>setLogin({...login,email:e.target.value})}
          />
          <CustomInput placeholder="Enter your password" type="password" 
           value={login.password}
           onChange={(e)=>setLogin({...login,password:e.target.value})}
          />
          <button
            type="submit"
            className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
          
          >
            Log In
          </button>
        </form>
  )
}

export default LoginForm