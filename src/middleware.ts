
import {  NextRequest, NextResponse } from "next/server";


export function middleware(req:NextRequest) {
    const token = req.cookies.get('jwtToken')?.value as string
        if(!token) {
            if(req.nextUrl.pathname.startsWith('/api/users/profile/') || req.nextUrl.pathname.startsWith('/api/comments/')){
                return NextResponse.json({message:'Authorization token is required'}, {status:401});

            }
        }
        else{
            if(
                req.nextUrl.pathname === '/login' ||
                req.nextUrl.pathname === '/register' 
            )
            return NextResponse.redirect(new URL('/', req.url));;
        }
    
}

export const config = {
    matcher:['/api/users/profile/:path*', '/api/comments/:path*',
        '/login', '/register'
    ]
}