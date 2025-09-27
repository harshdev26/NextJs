// NEXTAUTH Api route:- NEXTAUTH is a complete open-source authentication solution for Next.js applications.

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/model/User'; //to access the user model because this file contains the schema of the user model

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials', // unique identifier for the provider(it means we are using ccredential type provider for the login logic)
      name: 'Credentials',// name to display on the sign-in form
      credentials: {
        email: { label: 'Email', type: 'text' }, //defining the fields that will be submitted in the sign-in form 
        password: { label: 'Password', type: 'password' }, //defining the fields that will be submitted in the sign - in form
      },
      async authorize(credentials: any): Promise<any> { //authorize function is used to verify the user credentials and return the user object if the credentials are valid 
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt', //we are passing jwt because we are saving the session in jwt token not in the database because for small appplications its better to save the session in jwt token
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};