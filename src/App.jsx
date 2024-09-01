import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CharityCard from './components/CharityCard'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import ServiceCard from './components/ServiceCard'
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
      {/* <CharityCard /> */}
      <Signup />
      <Login />
      <ServiceCard />
    </>
  )
}

export default App
