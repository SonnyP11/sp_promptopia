"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  // session: {user: {…}, expires: '2023-08-01T10:18:41.052Z'}
  // user {name: 'sonny pham', email: 'sonny2pham@gmail.com', image: 'https://lh3.googleusercontent.com/a/...', id: '649caddb3ccfe55f6b816d32'}

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: "", tag: "" })

  const createPrompt = async (e) => {
    e.preventDefault() //stops page reload
    setSubmitting(true) // for a loader later

    try {
      // Making a POST request
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      })

    // Response {type: 'basic', url: 'http://localhost:3000/api/prompt/new', redirected: false, status: 201, ok: true, …}
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
