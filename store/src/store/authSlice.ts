// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Tipado para el usuario
export interface User {
    username : string
}

// Tipado para el estado de auth
interface AuthState {
    user : User | null
}

// Intentamos recuperar usuario desde localStorage
const savedUser = 
    typeof window !== 'undefined' ? localStorage.getItem('user') : null 

const initialState: AuthState = {
    user: savedUser ?   JSON.parse(savedUser) : null
}

// Creamos el slice con reducers para login y logout
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            localStorage.setItem('user' , JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer