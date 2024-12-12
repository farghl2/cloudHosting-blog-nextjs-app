'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import {toast} from 'react-toastify'


const AddCommentForm = () => {
   const [text, setText] = useState('');

    const formSubmitHandler =(e:React.FormEvent)=>{
        e.preventDefault();
        if(text === '' ) return toast.error('Please write something')
        console.log(text)

    }
  return (
    <form className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md " onSubmit={formSubmitHandler}>
          <CustomInput  placeholder="Add a comment ..." type="text"
          value={text}
          
          onChange={(e)=>setText(e.target.value)}
          className="rounded-lg text-xl p-2 w-full bg-white focus:shadow-md "/>
        
          <button type="submit" 
          className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition">
            Comment
          </button>
        </form>
  )
}

export default AddCommentForm