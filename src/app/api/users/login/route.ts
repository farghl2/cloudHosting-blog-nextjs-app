import prisma from "@/utils/db";
import { LoginDto } from "@/utils/dtos";
import { LoginSchema } from "@/utils/validationShemas";

import { NextResponse, NextRequest } from "next/server";


import * as bcrypt from 'bcryptjs';
import gJWT from "@/utils/gJWT";




/**
 * @method
 * @route ~/api/users/login
 * @desc login user
 * @access public
 */

export async function POST(req: NextRequest){
    try {
        const body = await req.json() as LoginDto; 
        const validation = LoginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
              { message: validation.error.errors[0].message },
              { status: 400 }
            );
          }
          const user = await prisma.user.findUnique({where:{email:body.email}})

          if(!user) return NextResponse.json({message:'this user has not profil'}, {status:400})

           const isPasswordMatched = await bcrypt.compare(body.password, user.password)
          if(!isPasswordMatched) return NextResponse.json({message: 'invalid password'}, {status:400})
          const jwtPayload = {
            id:user.id,
            isAdmin:user.isAdmin,
            username:user.username
          }  
          const token =gJWT(jwtPayload)
          return NextResponse.json({...user, token},{status:200});
        
    } catch (error) {
        return NextResponse.json({message: `internal server error ${error}`}, {status:500})
        
    }
}