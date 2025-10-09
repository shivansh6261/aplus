import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/config/db';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        role: { type: 'text' },
        enrollment: { type: 'text' },
        employeeId: { type: 'text' },
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { role, enrollment, employeeId, email, password } = credentials;

        let query = '';
        let values = [];

        if (role === 'student') {
          query = 'SELECT * FROM user WHERE Enrollment_No = ? AND Password = ?';
          values = [enrollment, password];
        } else if (role === 'faculty') {
          query = 'SELECT * FROM faculty WHERE Employee_ID = ? AND Password = ?';
          values = [employeeId, password];
        } else if (role === 'alumni') {
          query = 'SELECT * FROM alumni WHERE Email_ID = ? AND Password = ?';
          values = [email, password];
        } else {
          return null;
        }

        const [rows] = await db.execute(query, values);

        if (rows.length > 0) {
          const user = rows[0];
          return {
            id: user.id || user.Enrollment_No || user.Employee_ID || user.Email_ID,
            name: user.Name || email,
            email: email || user.Email_ID,
            role,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
