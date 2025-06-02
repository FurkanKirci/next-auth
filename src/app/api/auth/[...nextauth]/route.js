// src/app/api/auth/[...nextauth]/route.js
import NextAuth, { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
const ns = "https://next15.dev/"; 
export const authOptions /** @type {AuthOptions} */ = {
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL, // https://... domain içerir
      idToken:      true, 
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "login", // her girişte ekran göster
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      // account varsa ilk login'dir → role + alanları token'a yaz
      if (account && profile) {
        token.id      = profile.sub;                 // auth0|xxxx
        token.email   = profile.email;
        token.name    = profile.name;
        token.picture = profile.picture;
        token.role    = profile[`${ns}role`] ?? "asdasd";
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id:      token.id,
        name:    token.name,
        email:   token.email,
        role:    token.role,         // artık gerçek rol
        picture: token.picture,
      };
      return session;
    },
  },

  session: { strategy: "jwt" },

  pages: { signIn: "/" },

  redirect: async ({ baseUrl }) => `${baseUrl}/dashboard`,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
