import { Navigation } from '@components'
import { Modal, ModalProvider } from '@context'
import { BrewList, CoffeeList, Home } from '@views'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

function Layout() {
  return (
    <>
      <ModalProvider>
        <Navigation />
        <Outlet />
        <Modal />
      </ModalProvider>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/coffees',
        element: <CoffeeList />
      },
      {
        path: '/brews',
        element: <BrewList />
      }
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
