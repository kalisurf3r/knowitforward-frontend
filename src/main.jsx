import { createRoot } from 'react-dom/client'
import ReactDom from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css'

import App from './App.jsx'
import Home from './pages/Home';

const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
      children: [
          {
            index: true,
            element: <Home />,
          },           
          {
             
          },
          {
             
          },
          {
              
          },
      ],
  },
]);

ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)