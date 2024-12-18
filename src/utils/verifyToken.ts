import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { decodeUser } from "./types";

export function verifyToken(req: NextRequest): decodeUser{
    const token = req.cookies.get("jwtToken")?.value as string;
    return jwt.verify(token, process.env.JWT_SECRET as string) as decodeUser;
    
}