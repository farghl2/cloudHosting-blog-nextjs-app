
import {  NextRequest, NextResponse } from "next/server";


export function middleware(req:NextRequest) {
    const token = req.cookies.get('jwtToken')?.value as string
        if(!token) return NextResponse.json({message:'Authorization token is required'}, {status:401});
    
}

export const config = {
    matcher:['/api/users/profile/:path*']
}