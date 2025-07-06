'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk, logoutThunk } from '../store/authSlice'
import { AppDispatch, RootState } from '../store/store'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { loading, error, token, username: storedUsername } = useSelector(
    (state: RootState) => state.auth
  )

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginThunk(username))
      .unwrap()
      .then(() => {
        // no hace falta router.push ahora, si quieres mantenerlo puedes dejarlo
      })
      .catch(() => {})
  }

  const handleLogout = () => {
    dispatch(logoutThunk())
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
      <div className='bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Bollipan Shop 🐾</h2>

        {!token ? (
          <>
            <p className='text-center text-gray-500'>Inicia sesión para continuar</p>
            <form onSubmit={handleLogin} className='space-y-4'>
              <input
                type='text'
                placeholder='Tu nombre de usuario'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-gray-800 text-gray-900'
              />
              {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition'
              >
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className='text-center text-gray-800 text-lg'>
              ¡Hola <span className='font-semibold'>{storedUsername}</span>! 👋
            </p>
            <button
              onClick={handleLogout}
              className='w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition'
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  )
}