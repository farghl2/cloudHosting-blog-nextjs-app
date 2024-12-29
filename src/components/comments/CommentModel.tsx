'use client';
import {IoMdCloseCircleOutline} from 'react-icons/io'
import CustomInput from '../CustomInput';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';

type CommentModalProps ={
  setOpen:Dispatch<SetStateAction<boolean>>,
  commentText:string,
  commentId:number
}
const CommentModel = ({setOpen, commentId, commentText}:CommentModalProps) => {
  const [text, setText] = useState(commentText);
  const router = useRouter();

  const commentModelHandler =async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!text) return toast.info('type somthing');
    try {
      await axios.put(`${DOMAIN}/comments/${commentId}`, {text});
      router.refresh();
      setOpen(false);
      setText('');
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error?.response?.message)
      console.log(error);
    }

  }
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <form className="bg-white rounded-lg w-1/3 p-6 flex flex-col" 
      onSubmit={commentModelHandler}
      >
      <div className='flex justify-end items-start mb-2'>
        <IoMdCloseCircleOutline 
        onClick={()=>setOpen(false)}
        className='text-red-600 cursor-pointer' size={'24px'}/>

      </div>
        <CustomInput placeholder='Enter comment' type='text'
        value={text}
        onChange={(e)=>setText(e.target.value)}

        />
        <button type='submit' className='bg-green-600 text-white p-2 rounded-lg'>Update</button>

      </form>
    </div>
  );
};

export default CommentModel;
