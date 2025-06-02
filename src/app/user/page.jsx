import React from 'react'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
const UserPage = async () => {
  const session = await getServerSession(authOptions);

  // Eğer oturum açılmamışsa /login'e yönlendir
  if (!session) {
    redirect("/login");
  }
  return (
    <div>UserPage</div>
  )
}

export default UserPage