'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// useSearchParams is a client component hook used to read the current URL's query parameters.
import Profile from '@components/Profile'

// This route is pushed to the router in PromptCard component: router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
// params is the dynamic segment of the route: {post.creator._id} or {id: '64a25bf2e57df3c3036831ec'}. They are typically used to pass parameters to a route component. In this case, the id of the user is passed to the UserProfile component & you can access it with params.id.
// query parameter: name=${post.creator.username}, eg; name=sonnypham. There can be multiple query parameters joined by '&'. They are typically used for filtering data.
// useSearchParams is used to read the query parameters & use the methods to manipulate them.
const UserProfile = ({ params }) => {
  console.log(params)
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setUserPosts(data)
    }

    if (params?.id) fetchPosts()

  }, [params.id])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page. Explore ${userName}'s prompts and be inspired by the power of their immagination.`}
      data={userPosts}
    />
  )
}

export default UserProfile
