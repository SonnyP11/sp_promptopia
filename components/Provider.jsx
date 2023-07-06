'use client'
import { SessionProvider } from "next-auth/react"
// SessionProvider is a React Context Provider that wraps the entire app. It provides the session object to all pages and components in the app.
// session is an object with 2 properties: {"data":{"user":{"name":"helen","email":"helen@someting.com","image":null},"expires":"2023-07-31T21:56:14.367Z"},"status":"authenticated"}

const Provider = ({ children, session }) => {
  // session is passed as a prop to the SessionProvider component by the _app.jsx file. The _app.jsx file is the root component of the app. It is the parent of all other components. It is the parent of the Provider component. Therefore the session object is passed down to all components in the app.
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
