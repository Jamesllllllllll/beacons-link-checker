import NextAuth, { NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
// import SequelizeAdapter from '@auth/sequelize-adapter';
// import { Sequelize } from 'sequelize';

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
// const sequelize = new Sequelize('yourconnectionstring');

// About updating the database schema: https://authjs.dev/reference/adapter/sequelize#updating-the-database-schema
// I think it's about running the DB in production vs development. - James

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // adapter: SequelizeAdapter(sequelize),
  callbacks: {
    session({user, session}) {
      if (session.user) {
        // session.user.id = user.id;
        // console.log(session)
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
