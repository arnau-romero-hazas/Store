// app/page.tsx
import Login from '../components/Login'

export default function Home() {
  return (
    <main style={{ padding: '40px' }}>
      <h1>Redux Login Demo (Next.js + TypeScript)</h1>
      <Login />
    </main>
  )
}
