'use client'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, User } from '../store/authSlice'
import type { RootState, AppDispatch } from '../store/store'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
    
  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
        dispatch(login({ username: storedUsername }))
    }
  }, [dispatch])

  const handleLogin = () => {
    if (username.trim()) {
      const userData: User = { username }
      dispatch(login(userData))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Redux Login</h1>

        {user ? (
          <>
            <p data-testid="welcome-message" className='text-lg mb-4'>
              👋 Bienvenido, <span className='font-semibold'>{user.username}</span>
            </p>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <input
              type='text'
              placeholder='Tu nombre'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={handleLogin}
              className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            >
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Login
