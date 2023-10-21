import './App.css'
import BookList from './BookList'
import BookEdit from './BookEdit';
import { Link } from 'react-router-dom';
import BookCreate from './BookCreate';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
