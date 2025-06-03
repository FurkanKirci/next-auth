import React from 'react'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
const SuperAdminPage = async () => {
  const session = await getServerSession(authOptions);
    const role = session?.user?.role || "user";
    // if (!["superadmin"].includes(role.toLowerCase())) {
    //   redirect("/403");
    // }
  return (
    <div>SuperAdminPage</div>
  )
}

export default SuperAdminPage