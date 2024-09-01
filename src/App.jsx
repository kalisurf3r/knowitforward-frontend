import './App.css'
import './style.css'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Volunteer from './pages/Volunteer';
import Charities from './pages/Charities';
import Services from './pages/Services';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';


// function App() { 
//   return (
//     <>
//       <Navbar />
//       <main className="">
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   )
// }
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/volunteer",
        element: <Volunteer />
      },
      {
        path: "/charities",
        element: <Charities />
      },
      {
        path: "/services",
        element: <Services />
      },
    ],
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
