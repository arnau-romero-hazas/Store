import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (username: string, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { username })
      return response.data // { user, token }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login error')
    }
  }
)
