import { Outlet } from 'react-router-dom';

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Signup from "./components/Signup"
import CharityCard from "./components/CharityCard"
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
