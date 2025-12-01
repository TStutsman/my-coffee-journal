import { Login, Navigation } from '@components'
import { Modal, ModalProvider, StoreProvider } from '@context'
import { BrewList } from '@brews'
import { CoffeeList } from '@coffees';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

function Layout() {
  return (
    <>
      <StoreProvider>
      <ModalProvider>
        <Navigation />
        <Outlet />
        <Modal />
      </ModalProvider>
      </StoreProvider>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Login />
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
