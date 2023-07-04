"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"


const EditPrompt = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  // searchParams is an object with a key of 'id' and a value of the prompt id. For example: {id: '1234567890'}
  const promptId = searchParams.get("id")
  // searchParams.get("id") returns the value of the key 'id' in the searchParams object

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ prompt: "", tag: "" })

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }
    if (promptId) getPromptDetails()

  }, [promptId])



  const updatePrompt = async (e) => {
    e.preventDefault() //stops page reload
    setSubmitting(true) // for a loader later

    if (!promptId) return alert("Prompt ID not found")

    try {
      // Making a PATCH request
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

    // Response Eg: {type: 'basic', url: 'http://localhost:3000/api/prompt/12345', redirected: false, status: 201, ok: true, …}
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt