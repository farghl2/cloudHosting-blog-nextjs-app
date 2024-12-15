import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { NextApiRequest } from "next";
import jwt from 'jsonwebtoken';
interface Props {
    params:{id:string}
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(req: NextApiRequest, {params}:Props) {
    const {id} = params;
    
    try{
        const token = req.headers.authorization?.split(' ')[1] as string
        const decode = jwt.verify(token, process.env.JWT_SECRET as string)
        if(!decode) return NextResponse.json({message:'Invalid or expired token'}, {status:401});
        await prisma.user.delete({where:{id: +id}});
        return NextResponse.json({message:'user was deleted'}, {status:200});
    }catch(error){
        return NextResponse.json({message:`internal server error ${error}`})
    }


}