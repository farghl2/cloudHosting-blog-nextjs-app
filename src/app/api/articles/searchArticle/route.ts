import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



/**
 * @method GET
 * @route ~/api/articles?searchArtilce=value
 * @desc search for artice by title
 * @access public
 */

export async function GET(req: NextRequest){
    try {
        
        const searchTitle = req.nextUrl.searchParams.get('searchText');
    
        const articles:Article [] = await prisma.article.findMany({
            where:{
                ...(searchTitle?{
                title:{
                    startsWith: searchTitle,
                    mode:'insensitive'
                }}:{})
            },
            take: 6
            
        })
        return NextResponse.json(articles, {status:200});
    } catch (error) {
        return NextResponse.json({message:`internal server error ${error}`}, {status:500});
        
    }

}