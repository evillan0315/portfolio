import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const providersMap = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }),
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Invalid credentials");
      }
      const hashedPassword = await bcrypt.hash(credentials?.password, 12);
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isCorrectPassword = await bcrypt.compare(
        credentials.password,
        hashedPassword
      );
      if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
      }
      return user;
    },
  }),
];

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: providersMap,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
};
export default NextAuth({
  ...authOptions,
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session }) {
      if (session.user?.email) {
        const userD = await prisma.user.findFirst({
          where: { email: session.user?.email },
        });
        if (userD) {
          session.user = userD;
        }

        return session;
      }

      //const nSession = { ...session, user };
      return session; // The return type will match the one returned in `useSession()`
    },
    jwt({ token }) {
      return token; // The return type will match the one returned in `useSession()`
    },
  },
});
