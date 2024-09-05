import './Home.css'
import homeImg from '/heart-hands.jpeg'
import heartImg from '/Heart-hand-shake.svg'
import Login from '../components/Login'
import unicefLogo from '/logos/UNICEF-logo.png'
import faLogo from '/logos/feeding-america-logo.png'
import habitatLogo from '/logos/Habitat-For-Humanity-Logo.png'
import jgLogo from '/logos/Jane-Goodall-logo.png'
import stcLogo from '/logos/save-the-children-logo.png'
import redCrossLogo from '/logos/red-cross-logo.png'
import Signup from '../components/Signup'
import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'


export default function Home(props) {

    const [show, setShow] = useState(false);
    const homePageData = useLoaderData();
    const navigate = useNavigate();
    const services = homePageData.services.data;
    const charities = homePageData.charities.data;
    console.log("home.jsx services data: ", services);
    console.log("home.jsx charities data: ", charities);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const goServices = () => {
        navigate('/services')
    }
    const goCharities = () => {
        navigate('/charities')
    }

    const handleLoginSuccess = (userData) => {
        props.setUserData(userData);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }

    return (
        <div className='home-page'>
            <div className='heroSection'>
                <img className="home-img" src={homeImg} alt="image of many hands creating a heart" />
                <h2 className='tagline'>Donate the gift of time</h2>
            </div>
            <div className='mission-section'>
                <img className="heart-img" src={heartImg} alt="image of two hands creating a heart" />
                <p className='mission-stmt'><strong className='bold'>KnowItForward</strong> connects skilled professionals with charitable causes. Experts in fields like music, tutoring, and resume reviewing volunteer their time to support meaningful initiatives. Join us in donating the gift of time to make a difference.</p>
            </div>

            {
                !props.isLoggedIn ? (
                    <div id="login" className='login-section'>
                        <Login setUserData={handleLoginSuccess} />

                        {/* <h3 className='login-form'>login form</h3> */}
                        <p className='or'>- OR -</p>
                        <button className='signup-button' onClick={handleShow}>Sign Up</button>
                        {/* <Button type="button" className='signup-button' onClick={handleShow}>
                    Sign Up
                </Button> */}
                    </div>
                ) : (
                    <></>
                )
            }

            <div className='services-section'>
                <div className='services-categories'>
                    <h5 className='services-category'>Education</h5>
                    <h5 className='services-category'>Career</h5>
                    <h5 className='services-category'>Therapy</h5>
                    <h5 className='services-category'>Music</h5>
                    <h5 className='services-category'>Wellness</h5>
                    <h5 className='services-category'>Photography</h5>
                </div>
                <button className='services-button' onClick={goServices}>more...</button>
                <h3 className='services-title'>Services</h3>

            </div>
            <div className='charities-section'>
                <h3 className='charities-title'>Charities</h3>
                <button className='charities-button' onClick={goCharities}>more...</button>
                <div className='charities-logos'>
                    <img className='logo' src={faLogo} alt="" />
                    <img className='logo' src={stcLogo} alt="" />
                    <img className='logo' src={habitatLogo} alt="" />
                    <img className='logo' src={jgLogo} alt="" />
                    <img className='logo' src={redCrossLogo} alt="" />
                    <img className='logo' src={unicefLogo} alt="" />

                </div>
            </div>
            <Signup show={show}
                setUserData={props.setUserData} handleShow={handleShow}
                handleClose={handleClose} />
        </div>
    )

}