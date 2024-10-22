import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../App.css'
import '../style.css'
import ServiceCard from '../components/ServiceCard'

export default function Layout(props) {
    return (
        <>
            <Navbar isLoggedIn={props.isLoggedIn} userData={props.userData} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}