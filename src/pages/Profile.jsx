import { useEffect, useState, } from 'react';
import { getCharities, getSvcsAsCustomer, getSvcsAsServiceProvider, getUserProfileDetails, updateSvcRecord } from '../utils/apiUtil';
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
    const [lblText, setLblText] = useState("");
    const [lblcolor, setlblcolor] = useState("");


    // -------- helpers --------
    async function getSvcsOffrdAndPruneThem() {
        let active = [];
        let past = [];

        const svcsOffrd = await getSvcsAsServiceProvider(userId, token);
        console.log("Services that were offered by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = true;
            svc.isCustomer = false;
            if (svc.status === 'Booked') {
                svc.isBooked = true;
                active.push(svc);
            } else if (svc.status === 'Ready for payment') {
                svc.isReadyForPayment = true;
                active.push(svc);
            }
            else if (svc.status === 'Closed') {
                past.push(svc)
            }
        });
        setActiveSvc(active);
        setPastSvc(past);
    }

    async function getSvcsBookedAndPruneThem() {
        let active = [];
        let past = [];

        const svcsOffrd = await getSvcsAsCustomer(userId, token);
        console.log("Services that were booked by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = false;
            svc.isCustomer = true;
            if (svc.status === 'Booked') {
                svc.isBooked = true;
                active.push(svc);
            } else if (svc.status === 'Ready for payment') {
                svc.isReadyForPayment = true;
                active.push(svc);
            }
            else if (svc.status === 'Closed') {
                past.push(svc)
            }
        });
        setActiveSvc(active);
        setPastSvc(past);
    }

    // -------- React hooks --------
    useEffect(() => {

        const fetchProfileData = async () => {
            console.log(`useffect got back user id as: ${userId} and token as: ${token}`);
            console.log("Getting user profile details");
            const userDetResponse = await getUserProfileDetails(userId, token);
            console.log("User response received: ", userDetResponse);
            setUserDetails(userDetResponse.data);
            setCharities(userDetResponse.data.Charities)

            console.log("Get services provided by the user: ");
            await getSvcsOffrdAndPruneThem();
        };

        fetchProfileData();
    }, []);


    // --------  click handlers --------
    const handleSvcOffrdClick = async (e) => {
        console.log("li clicked");
        await getSvcsOffrdAndPruneThem();
    }

    const handleSvcBookedClick = async (e) => {
        await getSvcsBookedAndPruneThem();
        console.log(e);

    }

    const handleBtnSubmit = async (e, action) => {
        const svcId = e.currentTarget.dataset.svcId;
        console.log("Done btn clicked for", e);
        console.log("Updating status for svc with id: ", svcId);
        console.log("Action received: ", action);
        const response = await updateSvcRecord(svcId, action, token);
        console.log('response from PUT call');
        if (response.status === 200) {
            setLblText("Service status updated successfully");
            setlblcolor('blue');
        } else {
            setLblText("Failed to update service status");
            setlblcolor('red');
        }
    };

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
                        <div id='upcommingSvcscontainer'>

                            <label id="errMsg1" style={{ color: lblcolor, textWrap: 'wrap', maxWidth: '400px', textAlign: 'left' }}>{lblText}</label>
                            <div id="upcommingSvcs">
                                <h5 className='svcsSectionHeading'>Upcoming</h5>

                                {
                                    activeSvc.map((svc) => (
                                        <SummaryCard
                                            key={svc.id}
                                            id={svc.id}
                                            title={svc.title}
                                            isCustomer={svc.isCustomer}
                                            isServiceProvider={svc.isServiceProvider}
                                            isBooked={svc.isBooked}
                                            isReadyForPayment={svc.isReadyForPayment}
                                            firstName={svc.ServiceProvider.firstName}
                                            lastName={svc.ServiceProvider.lastName}
                                            basePrice={svc.basePrice}
                                            serviceDate={svc.serviceDate}
                                            timeLeft={svc.timeLeft}
                                            charityName={svc.Charity.charityName}
                                            paymentLink={svc.paymentLink}
                                            token={token}
                                            btnSubmit={handleBtnSubmit}
                                            status={svc.status}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <div id='pastSvcscontainer'>
                            <label id="errMsg2" style={{ color: lblcolor, textWrap: 'wrap', maxWidth: '400px', textAlign: 'left' }}>{lblText}</label>
                            <div id="pastSvcs">
                                <h5 className='svcsSectionHeading'>History</h5>
                                {
                                    pastSvc.map((svc) => (
                                        <SummaryCard
                                            key={svc.id}
                                            id={svc.id}
                                            title={svc.title}
                                            isCustomer={svc.isCustomer}
                                            isServiceProvider={svc.isServiceProvider}
                                            isBooked={svc.isBooked}
                                            isReadyForPayment={svc.isReadyForPayment}
                                            firstName={svc.ServiceProvider.firstName}
                                            lastName={svc.ServiceProvider.lastName}
                                            basePrice={svc.basePrice}
                                            serviceDate={svc.serviceDate}
                                            timeLeft={svc.timeLeft}
                                            charityName={svc.Charity.charityName}
                                            token={token}
                                            status={svc.status}
                                        />
                                    ))
                                }</div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

