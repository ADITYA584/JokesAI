import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("profile google :", profile);
        let userRole = "user";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },

      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
