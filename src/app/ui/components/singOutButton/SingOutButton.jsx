"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const domain   = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;      // dev-xxx.us.auth0.com   (https:// yok!)
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const returnTo = encodeURIComponent("http://localhost:3000/login");

  const fullLogout = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`;

  const handleLogout = async () => {
    // 1) NextAuth oturumunu kapat
    await signOut({ redirect: false });

    // 2) Auth0 oturumunu kapat + /login sayfasına dön
    window.location.replace(fullLogout);            // replace → tarayıcı geçmişine “/logout” eklemez
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
    >
      Çıkış Yap
    </button>
  );
}
