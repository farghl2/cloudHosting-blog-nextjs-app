import { NextApiRequest } from "next";
import {  NextResponse } from "next/server";


export function middleware(req:NextApiRequest) {
    const token = req.headers.authorization?.split(' ')[1]
        if(!token) return NextResponse.json({message:'Authorization token is required'}, {status:401});
    
}

export const config = {
    matcher:['/api/users/profile/:path*']
}