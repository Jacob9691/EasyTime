import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
