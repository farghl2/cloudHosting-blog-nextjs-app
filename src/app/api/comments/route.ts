import prisma from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";


/**
 * @method POST
 * @route ~/api/comments
 * @desc create comment
 * @access public
 */


export async function POST(req: NextRequest) {
    try {
        
        const user = verifyToken(req);
        if(!user) NextResponse.json({message: 'internal server error'}, {status:500})
            const body =await req.json() as CreateCommentDto;
    
    const createComment = await prisma.comment.create(
        {data:{
            text:body.text,
            articleId: +body.articleId,
            userId: +user.id
        }}
    )
    
    return NextResponse.json(createComment, {status:201});
} catch (error) {
    return NextResponse.json(`internal server error ${error}`, {status: 500})
}

} 


/**
 * @method GET
 * @route ~/api/comments
 * @desc get all comment if the user is admin
 * @access public
 */

export async function GET(req: NextRequest){
    try {
        
        const user = verifyToken(req);
        if(user === null || user.isAdmin === false ) return NextResponse.json({message: 'admins only can get all comment, accept denied'}, {status: 403});
        const comments =await prisma.comment.findMany();
        return comments
    } catch (error) {
        return NextResponse.json({message:`internal server error ${error}`}, {status:500})
        
    }
}