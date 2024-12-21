import prisma from "@/utils/db";
import {  NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Articles Count
 * @access public
 */


export async function GET() {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({mesage: `internal server error ${error}`}, {status:500})
    }
}