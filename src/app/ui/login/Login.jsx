"use client";

import { signIn } from "next-auth/react";
import SignOutButton from "../components/singOutButton/SingOutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Oturum zaten açıksa doğrudan dashboard’a at
  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-10 rounded-2xl">
        <h1 className="text-xl font-bold mb-4 text-center">Giriş Yap</h1>
        <p>Durum: {status}</p>
        {session ? (
          <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <SignOutButton></SignOutButton>
          </>
        ) : (
          <button className="px-4 py-2 my-2 rounded bg-red-500 text-white hover:bg-red-700 w-full" onClick={() => signIn("auth0")}>Auth0 ile Giriş Yap</button>
        )}
      </div>
    </main>
  );
}
