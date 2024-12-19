import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";
interface Props {
    params:{id:string}
}


/**
 * @method PUT
 * @route ~/api/comments/:id
 * @desc update single comment By Id
 * @access public
 */
export async function PUT(req: NextRequest, {params}:Props) {
    try {
        const user = verifyToken(req);
        const {id} = params;
        const comment =await prisma.comment.findUnique({where:{id: +id}});
        if(!comment) return NextResponse.json({message: 'comment not found'},{status:404});
        if(user === null || +user.id != comment.userId) return NextResponse.json({message: 'you cannot update this comment'},{status:403});
        const body = await req.json() as UpdateCommentDto
        const updateComment = await prisma.comment.update(
            {
                where:{id: +id},
                data:{
                    text: body.text
                }
            }
        )

        return NextResponse.json({updateComment}, {status:201});
    } catch (error) {
        return NextResponse.json({message: `internal server error, ${error}`}, {status:500})
    }
}


/**
 * @method DELETE
 * @route ~/api/comments/:id
 * @desc update single comment By Id
 * @access public
 */

export async function DELETE(req: NextRequest, {params}:Props) {
    const {id} = params;
    const user = verifyToken(req);
    const comment =await prisma.comment.findUnique({where:{id: +id}});
    if(!comment) return NextResponse.json({message: 'comment not found'},{status:404});
    if(+user.id != comment.userId || user.isAdmin === false) return NextResponse.json({message: 'you cannot update this comment'},{status:403});
    await prisma.comment.delete({where:{id:+id}});
    return NextResponse.json({message: 'comment deleted succefuly'}, {status: 200});

}