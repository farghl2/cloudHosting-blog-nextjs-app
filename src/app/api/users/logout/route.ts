import { NextRequest, NextResponse } from "next/server";



/**
 * @method GET
 * @route ~/api/users/logout
 * @desc logout user
 * @access public
 */


export function GET(req: NextRequest) {
    try {
        req.cookies.delete('jwtToken');
         return NextResponse.json({message: 'user logout'}, {status:200})
    } catch (error) {
        return NextResponse.json({message: `internal server error ${error}`}, {status:500})
    }
}