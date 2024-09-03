import './Home.css'
import homeImg from '../../public/heart-hands.jpeg'
import heartImg from '../../public/Heart-hand-shake.svg'
import Login from '../components/Login'
import unicefLogo from '../../public/logos/UNICEF-logo.png'
import faLogo from '../../public/logos/feeding-america-logo.png'
import habitatLogo from '../../public/logos/Habitat-for-Humanity-Logo.png'
import jgLogo from '../../public/logos/Jane-Goodall-logo.png'
import stcLogo from '../../public/logos/save-the-children-logo.png'
import redCrossLogo from '../../public/logos/red-cross-logo.png'
import { Link, useLoaderData } from 'react-router-dom'
import HomePageServiceCard from '../components/HomePageServiceCard'


export default function Home(props) {
    const homePageData = useLoaderData();
    const services = homePageData.services.data;
    const charities = homePageData.charities.data;
    console.log("Active services fetched in home page: ", services);

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
            <div id="login" className='login-section'>
                <Login setUserData={props.setUserData} />
                <p className='or'>- OR -</p>
                <button className='signup-button'>Sign Up</button>
            </div>
            <div className='services-section' style={{ justifyContent: 'center' }}>
                <h3 className='services-title'>SERVICES</h3>
                <HomePageServiceCard entries={services} />
                <Link to="/services" id="linkToServices" style={{}}>See all services &rarr; </Link>
            </div>
            <div className='charities-section'>
                <h3 className='charities-title'>Charities</h3>
                <button className='charities-button'>more...</button>
                <div className='charities-logos'>
                    <img className='logo' src={faLogo} alt="" />
                    <img className='logo' src={stcLogo} alt="" />
                    <img className='logo' src={habitatLogo} alt="" />
                    <img className='logo' src={jgLogo} alt="" />
                    <img className='logo' src={redCrossLogo} alt="" />
                    <img className='logo' src={unicefLogo} alt="" />

                </div>
            </div>
        </div >
    )

}