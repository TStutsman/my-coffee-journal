import { BrewForm, BrewList, CoffeeForm, CoffeeList, Home } from '@views'
import Navigation from '@components/Navigation'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
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
        path: '/brews',
        element: <BrewList />
      },
      {
        path: '/brews/new',
        element: <BrewForm />
      }
      
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
