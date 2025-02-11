import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/server/db";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

function isValidCredentials(
  credentials: Partial<Record<"email" | "password", unknown>>,
): credentials is { email: string; password: string } {
  return (
    typeof credentials.email === "string" &&
    typeof credentials.password === "string"
  );
}

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        if (!isValidCredentials(credentials)) {
          throw new Error("Enter valid credentials.");
        }

        let user = null;

        const { email, password } = credentials;

        user = await db.user.findUnique({ where: { email } });
        if (!user) return null;

        const passwordMatching = await bcrypt.compare(password, user.password);
        if (!passwordMatching) return null;

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
} satisfies NextAuthConfig;
