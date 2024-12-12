'use client';

import Link from "next/link";

type ErrorPageProps ={
    error:Error,
    reset:()=>void,
}

const ErrorPage = ({error, reset}:ErrorPageProps) => {
  return (
    <div className="pt-7 text-center">
        <div  className="text-3xl text-red-600 font-semibold">
            Somthing went wrong
        </div>
        <h2 className="text-gray-700 my-3 text-xl">
            Error Message: {error.message}

        </h2>
        <button onClick={()=>reset()} 
            className="bg-blue-500 hover:bg-blue-700  px-5 text-white font-bold py-2 rounded-full"
            >
              Try again  
        </button>
        <Link href={'/'} className="text-xl underline text-blue-700 block mt-6">Go to home page</Link>
    
    </div>
  )
}

export default ErrorPage