import { serialize } from "cookie";
export default function gCookie(token:string):string{

    return  serialize('jwtToken', token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
                sameSite:'strict',
                path:'/',
                maxAge: 60* 60* 24* 30,
              });
}