"use client";

import { signIn } from "next-auth/react";
import SignOutButton from "../components/singOutButton/SingOutButton";
import { useSession } from "next-auth/react";
export default function LoginPage() {
  const { data: session, status } = useSession();
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-10 rounded-2xl">
        <h1 className="text-xl font-bold mb-4 text-center">Giriş Yap</h1>
        <p>Durum: {status}</p>
      {session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <button onClick={() => signIn("auth0")}>Auth0 ile Giriş Yap</button>
      )}
        <SignOutButton></SignOutButton>
      </div>
    </main>
  );
}
