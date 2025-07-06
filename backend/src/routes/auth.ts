import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// Clave secreta para firmar el token (en producción debe ir en .env)
const JWT_SECRET = 'supersecreto-bollipan'

// Ruta POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { username } = req.body

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username requerido' })
  }

  const user = { username }

  // Creamos el token JWT
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' })

  return res.status(200).json({ user, token })
})

export default router
