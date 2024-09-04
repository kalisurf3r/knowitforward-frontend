import { useEffect, useState, } from 'react';
import { getCharities, getSvcsAsServiceProvider, getUserProfileDetails } from '../utils/apiUtil';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import SummaryCard from '../components/SummaryCard';

export default function Profile(props) {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    let userId;

    if (Date.now() >= expirationTime) {
        console.log("Invalid token");
        throw new Error("Invalid token cannot fetch data")
        //TODO: 
    }
    userId = decodedToken.id;
    const [userDetails, setUserDetails] = useState({});
    const [charities, setCharities] = useState([]);
    const [activeSvc, setActiveSvc] = useState([]);
    const [pastSvc, setPastSvc] = useState([]);


    // helpers 
    async function getSvcsOffrdAndPruneThem() {
        let active = [];
        let past = [];

        const svcsOffrd = await getSvcsAsServiceProvider(userId, token);
        console.log("Services that were offered by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = true;
            if (svc.status !== 'Closed') {
                console.log('is active');

                active.push(svc);
            } else {
                console.log('is past');
                past.push(svc)
            }
        });
        setActiveSvc(active);
        setPastSvc(past);

    }

    useEffect(() => {

        const fetchProfileData = async () => {
            console.log(`useffect got back user id as: ${userId} and token as: ${token}`);
            console.log("Getting user profile details");
            const userDetResponse = await getUserProfileDetails(userId, token);
            console.log("User response received: ", userDetResponse);
            setUserDetails(userDetResponse.data);
            setCharities(userDetResponse.data.Charities)
        };

        fetchProfileData();
    }, []);


    // btn click handlers
    const handleSvcOffrdClick = async (e) => {
        console.log("li clicked");
        await getSvcsOffrdAndPruneThem();
    }

    const handleSvcBookedClick = async (e) => {
        console.log(e);

    }

    console.log("User Details fetched and that will be processed");
    console.log(userDetails);
    console.log("charities");
    console.log(charities);
    console.log('svc offrd active');
    console.log(activeSvc);
    console.log('svc offrd past');
    console.log(pastSvc);


    return (

        <>
            <h1 id='profileHeader'>My Profile</h1>
            <div className="container-fluid profilePageContainer">
                <div className='row'>
                    <div className='col col-md-4 col-sm-6 col-12 userDetailsSection'>
                        <div className='userPicAndPersonalDetails'>

                            <img className="profilePicImg" src={userDetails.profileImgUrl} alt="profile pic" />
                            <div className='userPersonalDetails'>
                                <h3>{userDetails.firstName} {" "} {userDetails.lastName}</h3>
                                <p className="userDet">{userDetails.profession}</p>
                                <p className="userDet"><FontAwesomeIcon icon={faStar} /> {userDetails.ratings}</p>
                                <p className="userDet">{userDetails.email}</p>
                            </div>
                        </div>
                        <h4 id="aboutMeHeading">About me</h4>
                        <p className="aboutMe">{userDetails.aboutMe}</p>
                        <div className='userCharities'>
                            {
                                charities.map((ch) => (
                                    <img className="chLogo" key={ch.id} src={ch.logoImgUrl} alt="charity logo"></img>
                                ))
                            }
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item" id='svcsOffered' onClick={(e) => handleSvcOffrdClick(e)}><h4>Services I Offered</h4></li>
                            <li className="list-group-item" id='svcsBooked' onClick={(e) => handleSvcBookedClick(e)}><h4>Services I've Booked</h4></li>
                        </ul>
                    </div>

                    {/* Services display card */}
                    <div className='col col-md-8 col-sm-6 col-12 userSvcsDetailsSection'>
                        <div id="upcommingSvcs">
                            {
                                activeSvc.map((svc) => (
                                    <SummaryCard
                                        key={svc.id}
                                        id={svc.id}
                                        title={svc.title}
                                        isCustomer={svc.isCustomer}
                                        isServiceProvider={svc.isServiceProvider}
                                        firstName={svc.ServiceProvider.firstName}
                                        lastName={svc.ServiceProvider.lastName}
                                        basePrice={svc.basePrice}
                                        serviceDate={svc.serviceDate}
                                        timeLeft={svc.timeLeft}
                                        charityName={svc.Charity.charityName}
                                    />
                                ))
                            }
                        </div>
                        <div id="pastSvcs">{
                            pastSvc.map((svc) => (
                                <SummaryCard
                                    key={svc.id}
                                    id={svc.id}
                                    title={svc.title}
                                    isCustomer={svc.isCustomer}
                                    isServiceProvider={svc.isServiceProvider}
                                    firstName={svc.ServiceProvider.firstName}
                                    lastName={svc.ServiceProvider.lastName}
                                    basePrice={svc.basePrice}
                                    serviceDate={svc.serviceDate}
                                    timeLeft={svc.timeLeft}
                                    charityName={svc.Charity.charityName}
                                />
                            ))
                        }</div>
                    </div>

                </div>

            </div>
        </>
    );
}

