import prisma from "@/utils/db";
import { RegisterUserDto } from "@/utils/dtos";
import { CreateUserSchema } from "@/utils/validationShemas";

import { NextResponse, NextRequest } from "next/server";


import * as bcrypt from 'bcryptjs';
import gJWT from "@/utils/gJWT";
import gCookie from "@/utils/gCookie";


/**
 * @method
 * @route ~/api/users/register
 * @desc Create New User 
 * @access public
 */

export async function POST(req: NextRequest){
    try {
        const body = await req.json() as RegisterUserDto; 
        const validation = CreateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
              { message: validation.error.errors[0].message },
              { status: 400 }
            );
          }
          const user = await prisma.user.findUnique({where:{email:body.email}})

          if(user) return NextResponse.json({message:'this user has profil'}, {status:400})

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt);
          const newUser  = await prisma.user.create({
            data:{
             email:body.email,
             username:body.username,
             password:hashedPassword  
            },
            select:{
                username:true,
                id:true,
                isAdmin:true,
               
            }
          })

        
          const token = gJWT(newUser);
            const cookie = gCookie(token)
          return NextResponse.json({...newUser},{status:201,
            headers:{'Set-Cookie':cookie}
          });
        
    } catch (error) {
        return NextResponse.json({message: `internal server error ${error}`}, {status:500})
        
    }
}
