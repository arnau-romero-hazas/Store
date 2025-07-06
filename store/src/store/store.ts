// store/store.ts
// Importamos la función para crear el store
import { configureStore } from '@reduxjs/toolkit'
// Importamos el slice de autenticación
import authReducer from './authSlice'

// Creamos el store global
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

// Tipos para usar en useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
