import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../src/lib/mongodb.js";
import axios from "axios";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    pages: {
      signIn: "/auth/signin",
      error: "/auth/signin",
    },
    callbacks: {
      session: async ({ session, token }) => {
        session.userId = token.sub;
        return session;
      },
    },
  });
}
