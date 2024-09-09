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
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'


function getUniqueRandomIndices(arrayLength, count) {
    let randomIndices = [];

    while (randomIndices.length < count) {
        let randomIndex = Math.floor(Math.random() * arrayLength);

        // Add the index to the array only if it's not already present
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    return randomIndices;
}


export default function Home(props) {

    // we create our sample set of Services
    const [testState, setTestState] = useState(false);
    const currentRoute = useLocation();
    console.log("Path: ", currentRoute);
    if (currentRoute.pathname == '/') {
        if (testState == false) {
            setTestState(true);
        }
    }
    const [show, setShow] = useState(false);
    const homePageData = useLoaderData();
    const navigate = useNavigate();
    const services = homePageData.services.data;
    const charities = homePageData.charities.data;
    const categories = homePageData.categories.data;
    console.log("home.jsx services data: ", services);
    console.log("home.jsx charities data: ", charities);
    console.log("Services.jsx categories data: ", categories);

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


    const cardsToDisplay = getUniqueRandomIndices(services.length, 3);
    console.log("got back card indices as: ", cardsToDisplay);
    const selectServices = filterServices(cardsToDisplay);
    // Filter our Services Dataset(all) and grab our three indexes
    function filterServices(indicesArr) {
        const selected = indicesArr.map(elem => {
            return services[elem];
        });
        return selected
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
                        <p className='or'>- OR -</p>
                        <button className='signup-button' onClick={handleShow}>Sign Up</button>
                    </div>
                ) : (
                    <></>
                )
            }

            <div className='services-section'>
                <h3 className='services-title'>Services We Offer</h3>
                {/* Display only 3 random cards on the homepage */}
                <div className='services-cards' >
                    {selectServices.map((service) => (
                        <div className='svcs-cards' >
                            <ServiceCard
                                key={service.id}
                                serviceId={service.id}
                                serviceTitle={service.title}
                                serviceImg={service.ServiceProvider.profileImgUrl}
                                serviceProviderFirstName={service.ServiceProvider.firstName}
                                serviceProviderLastName={service.ServiceProvider.lastName}
                                serviceRating={service.ServiceProvider.ratings}
                                serviceCost={service.basePrice}
                                serviceDate={service.serviceDate}
                                serviceTimeLeft={service.timeLeft}
                                charityLogo={service.Charity.logoImgUrl}
                                serviceDesc={service.description}
                                serviceProvideremail={service.ServiceProvider.email}
                                testState={testState}
                            />
                        </div>
                    ))}
                </div>

                <button className='services-button' onClick={goServices}>more...</button>


            </div>
            <div className='charities-section'>
                {/* <h3 className='charities-title'>Charities</h3>
                <button className='charities-button' onClick={goCharities}>more...</button> */}
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