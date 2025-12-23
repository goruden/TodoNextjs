'use client'
import React, { useState } from 'react'
import { Services } from '@/app/api'

const SignUp = ({ setIsSignUp }: { setIsSignUp: (isSignUp: boolean) => void }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const signup = async () => {
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')

    try {
      await Services.signUp(username, password)
      await Services.login(username, password)
      window.location.href = '/'
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-1/3 mx-auto bg-gray-300 rounded-lg shadow-md p-4'>
      <form title='Sign Up' className='space-y-4'>
        <label>Username</label>
        <div className='mt-1'>
          <input
            type="text"
            value={username}
            onChange={changeUsername}
            placeholder='Username' id="username" className='w-full p-2 border rounded'
          />
        </div>
        <label>Password</label>
        <div>
          <input
            type="password"
            value={password}
            onChange={changePassword}
            placeholder='Password' id="password" className='w-full p-2 border rounded'
          />
        </div>
        <label>Confirm Password</label>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={changeConfirmPassword}
            placeholder='Confirm Password' id="confirm-password" className='w-full p-2 border rounded'
          />
        </div>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className='flex justify-between'>
        <button
          onClick={signup}
          disabled={loading}
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50'
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button
          onClick={() => setIsSignUp(false)}
          className='mt-4 text-blue-500 hover:text-blue-700'
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  )
}

export default SignUp