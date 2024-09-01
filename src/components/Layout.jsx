import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../App.css'
import '../style.css'

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}