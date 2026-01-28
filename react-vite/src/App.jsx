import { Auth, Navigation } from '@components'
import { Modal, ModalProvider, StoreProvider } from '@context'
import { BrewList } from '@brews'
import { CoffeeList } from '@coffees';
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'

function Layout() {
  const navigate = useNavigate();

  useEffect(()=> {
      const validSessionCookie = document.cookie.split(';').find((row) => row.startsWith('validSession'));
      const valid = validSessionCookie ? validSessionCookie.split('=')[1] : 'false';
      
      if(valid == 'false') {
        return navigate('/');
      }

      fetch('/api/csrf');
  }, [navigate]);

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
