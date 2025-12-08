import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "../../../../models/User";
import { compare } from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the given email");
          return null;
        }
        const isPasswordValid = await compare(  
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
          return null;
        }
        return { 
          id: user._id.toString(),
          username: user.username, 
          email: user.email, 
          createdAt: user.createdAt,  
          image: user.avatar || null,
      };
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // login
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.avatar = user.avatar || null;
      }
      return token;
    },
    async session({ session, token }) {
      // Transfer token to session.user
      session.user = {
      id: token.id,
      username: token.username,
      email: token.email,
      createdAt: token.createdAt,
      image: token.avatar || null,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };