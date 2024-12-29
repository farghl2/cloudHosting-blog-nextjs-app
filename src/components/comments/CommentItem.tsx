'use client';
import { CommentWithUser } from "@/utils/types"
import { FaEdit, FaTrash } from "react-icons/fa"
import CommentModel from "./CommentModel"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";


type CommentItemProps ={
    articleComment: CommentWithUser,
    userId:string
}

const CommentItem = ({articleComment, userId}:CommentItemProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const deleteComentHanler =async(id:number)=>{
       try {
        await axios.delete(`${DOMAIN}/comments/${id}`);
        router.refresh();
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       } catch (error:any) {
        toast.error(error?.response.message)
        console.log(error);
        
       }
    }
  return (
    <div
    className="mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300"
    >
        <div className="flex items-center justify-between mb-2">
            <strong className="text-gray-800 uppercase">
                {articleComment.user.username}
            </strong>
            <span className="bg-yellow-700 px-1 rounded-lg text-white">
               {new Date(articleComment.createdAt).toDateString()}
            </span>
        </div>
        <p className="text-gray-800 mb-2">
            {articleComment.text}
        </p>

        {
            userId && +userId === articleComment.userId &&
        <div className="flex justify-end items-center">
            <FaEdit className="text-green-600 text-xl cursor-pointer me-3" 
            onClick={()=>setOpen(true)}
            />
            <FaTrash
            onClick={()=>deleteComentHanler(articleComment.id)}
            className="text-red-600 text-xl cursor-pointer"/>
        </div>
        }
        {open && <CommentModel 
        commentId={articleComment.id}
        commentText={articleComment.text}
        setOpen={setOpen}/>}
    </div>
  )
}

export default CommentItem