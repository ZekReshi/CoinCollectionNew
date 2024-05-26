import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OpenAPI } from './api/index.ts'
import { DEFAULT_THEME, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from './components/AuthProvider.tsx'

const queryClient = new QueryClient()

OpenAPI.BASE = 'https://localhost:44353'
OpenAPI.TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRlMiLCJleHAiOjE3MTY3MzE1OTEsImlzcyI6Im1lIiwiYXVkIjoibWUifQ.BD2cVtRTXrxZE4kFpyGL559M4JvVzdg01zgpZ_r1wAA'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={DEFAULT_THEME}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
