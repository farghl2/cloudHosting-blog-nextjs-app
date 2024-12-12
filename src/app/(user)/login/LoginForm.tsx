'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import { toast } from "react-toastify"

import { useRouter } from "next/navigation"
const LoginForm = () => {
  const router = useRouter();
    const [login, setLogin] = useState({
        email:'',
        password:''
    })

    const formSubmitHandler =(e:React.FormEvent)=>{
        e.preventDefault();
        if(login.email === "") return toast.error('email is Required')
        if(login.password === "") return toast.error('email is Required')
        console.log(login);

        router.replace('/');


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