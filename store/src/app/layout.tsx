// app/layout.tsx
'use client'

import React from 'react'
import './globals.css'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
