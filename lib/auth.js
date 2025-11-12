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

          const fullName =
            user.Full_Name ||
            user.Name ||
            user.full_name ||
            user.name ||
            null;

          const emailFromDb = user.Email_ID || user.email || user.Email || email;

          const contactNumber =
            user.Contact_no ||
            user.Contact_No ||
            user.Contact ||
            user.contact ||
            user.contact_no ||
            user.contactNo ||
            user.Phone ||
            user.phone ||
            null;

          const batchValue =
            user.Batch ||
            user.Batch_Year ||
            user.batchYear ||
            user.batch ||
            user.Graduation_Year ||
            user.graduationYear ||
            null;

          return {
            id: user.id || user.Enrollment_No || user.Employee_ID || user.Email_ID || email,
            name: fullName || emailFromDb || email,
            email: emailFromDb || email,
            enrollment: user.Enrollment_No || null,
            role,
            fullName,
            contact: contactNumber,
            batch: batchValue,
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
        token.name = user.name;
        token.email = user.email;
        token.enrollment = user.enrollment;
        token.fullName = user.fullName ?? user.name ?? null;
        token.contact = user.contact ?? null;
        token.batch = user.batch ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.fullName || token.name;
      session.user.email = token.email;
      session.user.enrollment = token.enrollment;
      session.user.fullName = token.fullName || token.name || null;
      session.user.contact = token.contact || null;
      session.user.batch = token.batch || null;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
