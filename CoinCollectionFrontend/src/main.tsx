import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OpenAPI } from './api/index.ts'
import { DEFAULT_THEME, MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

OpenAPI.BASE = 'https://localhost:44353'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={DEFAULT_THEME}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
