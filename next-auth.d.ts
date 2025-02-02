import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role?: string;
  }
}

declare module "next-auth" {
  
  
  interface User extends DefaultUser {
    id: string;
    email: string;
      role?: string;
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
  /* 
  interface Account {
    id: number;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  }

  interface Profile {
    id: string; // Unique identifier for the user in the provider
    email?: string;
    name?: string;
    image?: string;
    [key: string]: any; // Allow additional fields
  }

  interface SessionToken {
    id: number;
    sessionToken: string;
    userId: string;
    expires: Date;
  }

  interface VerificationToken {
    identifier: string;
    token: string;
    expires: Date;
  }

  interface Post {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    authorId?: string;
  } */
}
