import { verifyTokenForPages } from "@/utils/verifyToken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

type ProtectForAdminProps ={
    children: ReactNode
}

const ProtectForAdmin = ({children}:ProtectForAdminProps) => {
    const token = cookies().get('jwtToken')?.value;
    const payLoad = verifyTokenForPages(token || '');
    if(!payLoad || !payLoad.isAdmin) return redirect('/');
  return (
    <div>{children}</div>
  )
}

export default ProtectForAdmin