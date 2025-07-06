import React from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import Login from '../Login'


// Test suite para el componente Login
describe('Login Component', () => {
    beforeEach(() => {
        // Limpiar el localStorage y el store antes de cada prueba
        localStorage.clear()
        store.dispatch({ type: 'auth/logout' })
    })

    it('renderiza el input y botón cuando no hay usuario', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
    })

    it('permite iniciar sesión con un nombre de usuario', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Tu nombre')
        fireEvent.change(input, { target: { value: 'testuser' } })

        fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

        expect(store.getState().auth.user).toEqual({ username: 'testuser' })
        expect(localStorage.getItem('user')).toEqual(JSON.stringify({ username: 'testuser' }))
    })

    it('muestra el nombre de usuario y botón de cerrar sesión al iniciar sesión', () => {
        store.dispatch({ type: 'auth/login', payload: { username: 'testuser' } })

        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        // Usamos una función para que encuentre el texto aunque esté dividido
        expect(screen.getByText((content, element) => {
            return element?.textContent === '👋 Bienvenido, testuser'
        })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument()
    })

    it('permite cerrar sesión', () => {
        store.dispatch({ type: 'auth/login', payload: { username: 'testuser' } })

        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

        expect(store.getState().auth.user).toBeNull()
        expect(localStorage.getItem('user')).toBeNull()
    })

    it('no permite iniciar sesión con un nombre vacío', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

        expect(store.getState().auth.user).toBeNull()
        expect(localStorage.getItem('user')).toBeNull()
    })

    it('recupera el usuario del localStorage al cargar', async () => {
    // Arrange: simulamos un usuario guardado
    const user = { username: 'testuser' }
    localStorage.setItem('username', user.username)

    // Creamos un store limpio
    const store = configureStore({ reducer: { auth: authReducer } })

    // Renderizamos el componente con Provider y el store limpio
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    // Assert: esperamos al mensaje
    await waitFor(() =>
      expect(screen.getByTestId('welcome-message')).toHaveTextContent(
        `👋 Bienvenido, ${user.username}`
      )
    )
  })

 
  it('no muestra el input ni botón de inicio de sesión si ya hay un usuario', () => {
    const user = { username: 'testuser' }
    localStorage.setItem('user', JSON.stringify(user))
    store.dispatch({ type: 'auth/login', payload: user }) // sincroniza Redux

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    expect(screen.queryByPlaceholderText('Tu nombre')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Iniciar sesión' })).not.toBeInTheDocument()
  })

    it('no muestra el botón de cerrar sesión si no hay usuario', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        expect(screen.queryByRole('button', { name: 'Cerrar sesión' })).not.toBeInTheDocument()
    })

    it('no permite iniciar sesión con un nombre de usuario solo con espacios', () => {
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Tu nombre')
        fireEvent.change(input, { target: { value: '   ' } })
        fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

        expect(store.getState().auth.user).toBeNull()
        expect(localStorage.getItem('user')).toBeNull()
    })
})
