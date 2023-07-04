'use client'
import { SessionProvider } from "next-auth/react"
// SessionProvider is a React Context Provider that wraps the entire app. It provides the session object to all pages and components in the app.
// The session prop is an object that contains the user's session data which is a browser cookie. Therefore this needs 'use client'
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
