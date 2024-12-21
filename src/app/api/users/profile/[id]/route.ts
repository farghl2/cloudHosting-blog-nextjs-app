import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import * as bcrypt from 'bcryptjs';

import { UpdatedUserDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access private (only user himself can delete his account)
 */

export async function DELETE(req: NextRequest, { params }: Props) {
  const { id } = params;

  try {
    
    const decode = verifyToken(req);
    if (!decode)
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    const user = await prisma.user.delete({ where: { id: +id },include:{comments:true} });
    const commentIds:number [] = user.comments.map(comment=>comment.id);
    await prisma.comment.deleteMany({
      where:{id:{in:commentIds}}
    })
    return NextResponse.json({ message: "user was deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `internal server error ${error}` });
  }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc GET Profile
 * @access private (only user himself can get his account)
 */

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error ${error}` },
      { status: 500 }
    );
  }
}
/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc PUT Profile
 * @access private (only user himself can update his account)
 */

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: +id },
      
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    const body =await req.json() as UpdatedUserDto;
    if(body.password) {
        const salt = await bcrypt.genSalt(10);
                     
        body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({where:{id:+id},
    data:{
        email:body.email,
        username:body.username,
        password:body.password

    }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...other} = updatedUser;

    return NextResponse.json(other,{status:200})
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error ${error}` },
      { status: 500 }
    );
  }
}
