import { BrewForm, BrewList, CoffeeForm, CoffeeList, Home } from '@views'
import { Navigation } from '@components'
import { ModalProvider, Modal } from '@context'
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
        path: '/coffees/new',
        element: <CoffeeForm />
      },
      {
        path: '/coffees/edit/:coffeeId',
        element: <CoffeeForm />
      },
      {
        path: '/brews',
        element: <BrewList />
      },
      {
        path: '/brews/new',
        element: <BrewForm />
      },
      {
        path: '/brews/edit/:brewId',
        element: <BrewForm />
      }
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
