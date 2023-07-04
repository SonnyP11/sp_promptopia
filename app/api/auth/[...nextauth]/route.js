// [] = dynamic route. ... = catch all route. nextauth = route name. so [...nextauth] means any route that starts with /api/auth/nextauth will be handled by this file


import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user'
import { connectToDB } from '@utils/database'

// Handles authentication
const handler = NextAuth({
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],

	callbacks: {

		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email })
			session.user.id = sessionUser._id.toString()

			return session
		},

		async signIn({ profile }) {
			// profile is passed to signIn from NextAuth?
			try {
				await connectToDB()

				// Check if a user already exists
				const userExists = await User.findOne({ email: profile.email })

				// If not, create a new user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture
					})
				}

				return true

			} catch (error) {
				console.log(error)
				return false
			}
		}
	}
})

export { handler as GET, handler as POST }