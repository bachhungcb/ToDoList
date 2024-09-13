import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import RegisterPage from './pages/register.jsx';
import ErrorPage from './pages/error.jsx';
import NotesPage from './pages/notes.jsx';
import UsersPage from './pages/users.jsx';

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "user",
        element: <UsersPage/>
      },
      {
        path: "note",
        element: <NotesPage/>
      },
      {
        path: "register",
        element: <RegisterPage/>
      },
    ],
  },
 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
