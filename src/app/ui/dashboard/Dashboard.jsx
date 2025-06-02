import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SignOutButton from "../components/singOutButton/SingOutButton";
import Link from "next/link";
export default async function Dashboard() {
  //session uzerinden de cekim yapabiliriz.
  //kullaniciyi ContextApi uzerine kaydedip uygulama hafizasinda da tutabiliriz.
  //verifyToken backend sorgulari icin kullanilir ama UI icin tekon-decode kullanabiliriz.
  //burada kullaniciyi auth0 uzerinden hem session hem de
  const session = await getServerSession(authOptions);
  const { user } = await getServerSession(authOptions);
  const roleBoxes = [
    { role: "superAdmin", title: "SuperAdmin", href: "/superAdmin" },
    { role: "admin", title: "Admin", href: "/admin" },
    { role: "user", title: "User", href: "/user" },
  ];
  return (
    <div className="space-y-3 p-10">
      <h1 className="text-2xl font-bold">Merhaba, {user.name}!</h1>
      <p>E-posta : {user.email}</p>
      <p>Rol : {user.role}</p>
      <img src={user.picture} alt="" className="w-16 rounded-full" />
      <div className="grid gap-6 p-10 sm:grid-cols-3">
        {roleBoxes.map(({ role, title, href }) => {
          const allowed = user.role === role; // yetkili mi?
          return (
            <Link
              key={role}
              href={allowed ? href : "#"}
              className={`flex h-32 items-center justify-center rounded-2xl border
                        text-xl font-bold shadow-md transition
                        ${
                          allowed
                            ? "bg-white hover:bg-gray-50 cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
            >
              {title}
            </Link>
          );
        })}
      </div>
      <SignOutButton></SignOutButton>
    </div>
  );
}
