"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-10 rounded-2xl">
        <h1 className="text-xl font-bold mb-4 text-center">Giriş Yap</h1>
        <button
          onClick={() => signIn("auth0")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </main>
  );
}
