import ReactDom from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './style.css'
import App from './App.jsx'


ReactDom.createRoot(document.getElementById('root')).render(
  <App />
)

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {

//       },
//       {

//       },
//       {

//       },
//     ],
//   },
// ]);

// ReactDom.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// )