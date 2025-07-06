// src/index.ts
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`Servidor Bollipan escuchando en http://localhost:${PORT}`)
})
