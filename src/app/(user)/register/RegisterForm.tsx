'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import { toast } from "react-toastify"

const RegisterForm = () => {
    const [register, setregister] = useState({
        email:'',
        password:'',
        userName:''
    })

    const formSubmitHandler =(e:React.FormEvent)=>{
        e.preventDefault();
        if(register.email === "") return toast.error('email is Required')
        if(register.password === "") return toast.error('email is Required')
        if(register.userName === "") return toast.error('userName is Required')
        console.log(register);


    }
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <CustomInput  placeholder="Enter your username" type="text"
          value={register.userName}
          onChange={(e)=>setregister({...register,userName:e.target.value})}
          />
          <CustomInput  placeholder="Enter your Email" type="email"
          value={register.email}
          onChange={(e)=>setregister({...register,email:e.target.value})}
          />
          <CustomInput placeholder="Enter your password" type="password" 
           value={register.password}
           onChange={(e)=>setregister({...register,password:e.target.value})}
          />
          <button
            type="submit"
            className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
          
          >
            Register
          </button>
        </form>
  )
}

export default RegisterForm