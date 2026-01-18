import { Auth, Navigation } from '@components'
import { Modal, ModalProvider, StoreProvider } from '@context'
import { BrewList } from '@brews'
import { CoffeeList } from '@coffees';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
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
        element: <Auth />
      },
      {
        path: '/coffees',
        element: <CoffeeList />
      },
      {
        path: '/brews',
        element: <BrewList />
      },
      {
        path: '/*',
        element: <Navigate to='/'/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
