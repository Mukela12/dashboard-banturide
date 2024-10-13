import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

async function getUser(email: string): Promise<User | null> {
  try {
    const { rows } = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate credentials
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Fetch user by email
        const user = await getUser(email);
        if (!user) {
          console.log('User not found');
          return null;
        }

        // Compare the provided password with the stored hashed password
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log('Password does not match');
          return null;
        }

        // If everything is fine, return the user
        return user;
      },
    }),
  ],
});
