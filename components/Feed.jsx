'use client'
// Order of component render: Feed -> PromptCardList -> Feed useEffect -> Feed re-render -> PromptCardList re-render -> PromptCard renders.

// Feed re-renders when posts state changes by useEffect. useEffect runs when Feed component is mounted.

// PromptCardList re-renders when data prop changes.

// PromptCard does not re-render because 'post' prop is just one post element from data array. It does not change.

// PromptCard does not render before useEffect in Feed runs because data prop in PromptCardList is an empty array initially. Therefore data.map() does not run.
import { useState, useEffect } from "react"
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])
  
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json()

    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // the filterPrompts function filters an array of posts (allPosts) based on whether the searchText matches the username, tag, or prompt properties of each post. Regular expressions are used with the 'gi' flags to perform case-insensitive and global matching. The function returns a new array with the filtered posts.
  // Any post that matches the searchText is returned in the new array.
  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'gi')// Change to 'i' later

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) || 
        regex.test(item.tag) || 
        regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e) => {
    // Clear the timeout if the user is still typing
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce the search, meaning that the search will only run after the user has stopped typing for 500ms
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )    
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }


  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        // Searched Prompts
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        // All Prompts
        <PromptCardList 
          data={allPosts} 
          handleTagClick={handleTagClick} 
        />
      )}

    </section>
  )
}

export default Feed

