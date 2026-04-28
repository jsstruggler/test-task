import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { routePaths } from '@/app/routes'
import { StepLayout } from '@/components/shared'
import { LoanFormPage, PersonalFormPage, WorkFormPage } from '@/pages'

const router = createBrowserRouter([
  {
    element: <StepLayout />,
    children: [
      {
        path: routePaths.personal,
        element: <PersonalFormPage />,
      },
      {
        path: routePaths.work,
        element: <WorkFormPage />,
      },
      {
        path: routePaths.loan,
        element: <LoanFormPage />,
      },
      {
        path: '*',
        element: <Navigate replace to={'/' + routePaths.personal} />,
      },
    ],
  },
])

const App = () => <RouterProvider router={router} />

export default App
