'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import { toast } from "react-toastify"
import axios, { AxiosError } from "axios"
import { DOMAIN } from "@/utils/constants"

const AddArticleForm = () => {
    const [article, setArticle] = useState({
        title:'',
        description:''
    })

    const formSubmitHandler = async(e:React.FormEvent)=>{
        e.preventDefault();
        if(article.title === "") return toast.error('title is Required')
        if(article.description === "") return toast.error('description is Required')
        try {
      await axios.post(`${DOMAIN}/articles`,{...article})
      toast.success('Article added successfuly');
      setArticle({
         title:'',
        description:''
      })
          
        } catch (error) {
          if(error instanceof AxiosError){
            toast.error(error.response?.data?.message);

          }else{
            toast.error('An unexpected error occurred');
          }
        }

    }
  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
          <CustomInput  placeholder="Enter your title" type="text"
          value={article.title}
          onChange={(e)=>setArticle({...article,title:e.target.value})}
          />
          <textarea placeholder="Enter your description" 
          className="mb-4 p-2 lg:text-xl rounded resize-none"
          rows={5}

           value={article.description}
           onChange={(e)=>setArticle({...article,description:e.target.value})}
          />
          <button
            type="submit"
            className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
          
          >
            Add Article
          </button>
        </form>
  )
}

export default AddArticleForm