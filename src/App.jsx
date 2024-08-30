import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom';
import './App.css'
function App() { 
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
