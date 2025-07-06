// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { username })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('username', user.username)
      return { token, username: user.username }
    } catch (error: any) {
      return rejectWithValue('Credenciales inválidas')
    }
  }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  return null
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as string | null,
    username: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.username = action.payload.username
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null
        state.username = null
      })
  },
})

export default authSlice.reducer
