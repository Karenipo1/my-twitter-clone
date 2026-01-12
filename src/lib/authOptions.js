import Credentials from "next-auth/providers/credentials";
import User from "@/models/User";
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
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          image: user.avatar || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.avatar = user.image || null;
      }
      return token;
    },
    async session({ session, token }) {
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