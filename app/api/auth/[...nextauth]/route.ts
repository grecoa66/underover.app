import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  // max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth. Without this, JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PostgresAdapter(pool),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Attach the user's id to the session for easy access.
    session: async ({ session, user }) => {
      if (session?.user && user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    redirect: async ({ url }) => {
      // Redirect to the url the user came from
      return url;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
