
import { CreateArticeDto } from "@/utils/dtos";

import { createArticleSchema } from "@/utils/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get All Artices
 * @access public
 */
export async function GET() {
    try {
        const articles = await prisma.article.findMany();

        
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
    return NextResponse.json({
        message:`internal server error ${error}`
    },{status:500})
  }
        
    
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Create new article
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    const body: CreateArticeDto = (await req.json()) as CreateArticeDto;

  const validation = createArticleSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  const newArticle: Article = await prisma.article.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({
        message:`internal server error ${error}`
    },{status:500})
  }
}
