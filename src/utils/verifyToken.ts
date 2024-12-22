import { NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import { decodeUser } from "./types";

export function verifyToken(req: NextRequest): decodeUser | null{
    try {
        
        const token = req.cookies.get("jwtToken")?.value as string;
        return jwt.verify(token, process.env.JWT_SECRET as string) as decodeUser;
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error:any) {
        return null
    }
}

export function verifyTokenForPages(token: string): decodeUser |null{
    try {
        
        const user =jwt.verify(token, process.env.JWT_SECRET as string) as decodeUser;
        if(!user) return null;
        return user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
        
    }
    
}