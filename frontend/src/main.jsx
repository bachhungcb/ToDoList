import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";

import RegisterPage from './pages/register.jsx';
import ErrorPage from './pages/error.jsx';
import NotesPage from './pages/notes.jsx';
import UsersPage from './pages/users.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import ProfilePage from './pages/profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
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
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "profile",
        element: <ProfilePage/>
      }
    ],
  },
 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
    <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>,
)
