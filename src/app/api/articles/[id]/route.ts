
import { UpdateArticeDto } from "@/utils/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

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
    const article =await prisma.article.findUnique({where:{id: +params.id}})

    if(!article) return NextResponse.json({message:'article not found'}, {status:404})
    return NextResponse.json(article, {status:200})

}

/**
 * @method PUT
 * @route ~/api/articles/:id
 * @desc update single Article By Id
 * @access public
 */

export async function PUT(req: NextRequest, {params}: Props){
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
 * @access public
 */

export async function DELETE(req: NextRequest, {params}: Props){
    const article =await prisma.article.findUnique({where:{id: +params.id}})
    if(!article) return NextResponse.json({message:'article not found'}, {status:404})

    await prisma.article.delete({where:{id:+params.id}});
    return NextResponse.json({message:'article deleted'}, {status:201})

}