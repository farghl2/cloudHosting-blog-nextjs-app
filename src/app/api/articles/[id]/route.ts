
import { UpdateArticeDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
    params: {id:string}
}
/**
 * @method GET
 * @route ~/api/articles/:id
 * @desc Get single Article By Id
 * @access public
 */

export async function GET(req: NextRequest, {params}: Props){
    const article =await prisma.article.findUnique({where:{id: +params.id},
    include:{comments:{
        include:{user:{select:{username:true}}}
    }}
    })

    if(!article) return NextResponse.json({message:'article not found'}, {status:404})
    return NextResponse.json(article, {status:200})

}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc update single Article By Id
 * @access private (admin only)
 */

export async function PUT(req: NextRequest, {params}: Props){
    const user = verifyToken(req);
    if(user === null || user.isAdmin === false) return NextResponse.json({message: 'only admin, access denid'}, {status: 403});
    const article = await prisma.article.findUnique({where:{id: +params.id}});
    if(!article) return NextResponse.json({message:'article not found'}, {status:404})

        const body = (await req.json()) as UpdateArticeDto
       await prisma.article.update({
        where:{id:+params.id},
        data:{
            title:body.title,
            description:body.description
        }
       })
    return NextResponse.json({message:'article updated'}, {status:201})

}
/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc delete Article By Id
 * @access private (only admin)
 */

export async function DELETE(req: NextRequest, {params}: Props){
    const user = verifyToken(req);
    if(user === null || user.isAdmin === false) return NextResponse.json({message: 'only admin, access denid'}, {status: 403}); 
    const article =await prisma.article.findUnique({where:{id: +params.id},
    include:{comments:true}
    })
    if(!article) return NextResponse.json({message:'article not found'}, {status:404})

    const commentIds:number[] = article?.comments.map(comment=>comment.id);
    await prisma.comment.deleteMany({
        where:{id:{in:commentIds}}
    })
    await prisma.article.delete({where:{id:+params.id}});
    return NextResponse.json({message:'article deleted'}, {status:201})

}