import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import { ApplicationFormProvider } from '@/context/ApplicationFormProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApplicationFormProvider>
      <App />
    </ApplicationFormProvider>
  </StrictMode>,
)
