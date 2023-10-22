import './App.css'
import BookList from './BookList'
import BookEdit from './BookEdit';
import { Link } from 'react-router-dom';
import BookCreate from './BookCreate';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />
  },
  {
    path: "/create",
    element: <BookCreate />
  },
  {
    path: "/edit/:id",
    element: <BookEdit />
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },

])
function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Link to='/create'>create</Link>
        <BookList />
      </RouterProvider>
    </>
  )
}

export default App
