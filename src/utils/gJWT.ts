import jwt from 'jsonwebtoken';

export default function gJWT (jwtPayload:object):string{

   return jwt.sign(jwtPayload, process.env.JWT_SECRET as string,{
                expiresIn:'30d'
              });
}