'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { set } from 'mongoose'
// useSession is a React Hook in the NextAuth library that returns an object containing 2 values: data and status.
// NextAuth also proves a signIn function that takes a provider ID as an argument. This function will redirect the user to the provider's login page. The signOut function will sign the user out of the current session.

const Nav = () => {
  const { data: session } = useSession()
  // destructure data & assign it to session
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      // setProviders here is not the same as the state variable. It's a local variable scoped to the useEffect callback function.
      const response = await getProviders()
      // getProviders returns 
      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation - hidden on small */}
      <div className='sm:flex hidden'>

        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href='/profile' className='flex gap-2 flex-center'>
              <Image 
                src={session?.user.image}
                alt="profile" 
                width={37} 
                height={37} />
            </Link>
          </div>

        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation - hidden on medium and up */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
              src={session?.user.image}
              alt="profile" 
              width={37} 
              height={37} 
              onClick={() => setToggleDropdown((prev) => !prev)}
              // setToggleDropdown(!toggleDropdown)} can cause issues
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                  href='/profile' 
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link 
                  href='/create-prompt' 
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
