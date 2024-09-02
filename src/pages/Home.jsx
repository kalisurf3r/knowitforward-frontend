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


export default function Home(props) {

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
                {/* <h3 className='login-form'>login form</h3> */}
                <p className='or'>- OR -</p>
                <button className='signup-button'>Sign Up</button>
            </div>
            <div className='services-section'>
                <h3 className='services-title'>Services</h3>
                <div className='services-categories'>
                    <h5 className='services-category'>Education</h5>
                    <h5 className='services-category'>Career</h5>
                    <h5 className='services-category'>Therapy</h5>
                    <h5 className='services-category'>Music</h5>
                    <h5 className='services-category'>Wellness</h5>
                    <h5 className='services-category'>Photography</h5>
                </div>
                {/* <button className='services-button'>more...</button> */}


            </div>
            <div className='charities-section'>
                <h3 className='charities-title'>Charities</h3>
                {/* <button className='charities-button'> > </button> */}
                <div className='charities-logos'>
                    <img className='logo' src={faLogo} alt="" />
                    <img className='logo' src={stcLogo} alt="" />
                    <img className='logo' src={habitatLogo} alt="" />
                    <img className='logo' src={jgLogo} alt="" />
                    <img className='logo' src={redCrossLogo} alt="" />
                    <img className='logo' src={unicefLogo} alt="" />

                </div>
            </div>
        </div>
    )

}