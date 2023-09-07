import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import SequelizeAdapter from '@auth/sequelize-adapter';
import { Sequelize } from 'sequelize';

// https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database
const sequelize = new Sequelize('yourconnectionstring');

// About updating the database schema: https://authjs.dev/reference/adapter/sequelize#updating-the-database-schema
// I think it's about running the DB in production vs development. - James

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // todo: get a NEXTAUTH_SECRET
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
});
