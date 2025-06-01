import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Merhaba, {session?.user?.name}!</h1>
      <p className="text-gray-600">E-posta: {session?.user?.email}</p>
    </div>
  );
}
