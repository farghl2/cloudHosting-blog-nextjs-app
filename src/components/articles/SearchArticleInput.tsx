'use client'
import { useState } from "react"
import CustomInput from "@/components/CustomInput"
import { useRouter } from "next/navigation";


const SearchArticleInput = () => {
   const [searchText, setSearchText] = useState('');
   const router = useRouter();

    const formSubmitHandler =(e:React.FormEvent)=>{
        e.preventDefault();
     return   router.push(`articles/search?searchText=${searchText}`);
       

    }
  return (
    <form className="my-5 m-auto md:w-2/3 w-full " onSubmit={formSubmitHandler}>
          <CustomInput  placeholder="Search for article" type="search"
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          className="w-full p-3 rounded text-xl border-none text-gray-900"
          /> 
        </form>
  )
}

export default SearchArticleInput