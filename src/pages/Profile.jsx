import { useEffect, useState } from "react";
import {
    getCharities,
    getSvcsAsCustomer,
    getSvcsAsServiceProvider,
    getUserProfileDetails,
    updateSvcRecord,
} from "../utils/apiUtil";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SummaryCard from "../components/SummaryCard";
import { useNavigate } from "react-router-dom";
import { Accordion, Nav } from 'react-bootstrap';
import { MailOutline, StarOutline } from 'react-ionicons';

export default function Profile(props) {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const navigate = useNavigate();
    let userId;

    if (Date.now() >= expirationTime) {
        console.error("Invalid token");
        // throw new Error("Invalid token cannot fetch data")
        navigate('/');
        //TODO: 
    }
    userId = decodedToken.id;
    const [userDetails, setUserDetails] = useState({});
    const [charities, setCharities] = useState([]);
    const [activeSvc, setActiveSvc] = useState([]);
    const [pastSvc, setPastSvc] = useState([]);
    const [lblText, setLblText] = useState("");
    const [lblcolor, setlblcolor] = useState("");
    const [activeTab, setActiveTab] = useState("open");
    const [activeOnlySvc, setActiveOnlySvc] = useState([]);


    // -------- helpers --------
    async function getActiveOblySvcByUsrAndPruneThem() {
        let activeOnly = [];
        document.getElementById('upcommingSvcscontainer').style.display = 'none';
        document.getElementById('pastSvcscontainer').style.display = 'none';
        document.getElementById('activeOnlySvcscontainer').style.display = 'block';

        const svcsOffrd = await getSvcsAsServiceProvider(userId, token);
        console.log("Active services that are posted by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = true;
            svc.isCustomer = false;
            svc.color = 'blue'
            if (svc.status === 'Active') {
                activeOnly.push(svc);
            }
        });
        console.log("Active only list of svcs: ", activeOnly);
        setActiveOnlySvc(activeOnly);
    }

    async function getSvcsOffrdAndPruneThem() {
        let active = [];
        let past = [];
        document.getElementById('upcommingSvcscontainer').style.display = 'block';
        document.getElementById('pastSvcscontainer').style.display = 'block';
        document.getElementById('activeOnlySvcscontainer').style.display = 'none';
        const svcsOffrd = await getSvcsAsServiceProvider(userId, token);
        console.log("Services that were offered by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = true;
            svc.isCustomer = false;
            if (svc.status === "Booked") {
                svc.isBooked = true;
                svc.color = 'green';
                console.log("cutomer email: ", svc.Customer.email);
                active.push(svc);
            } else if (svc.status === "Ready for payment") {
                console.log("cutomer email for payment: ", svc.Customer.email);
                svc.color = 'orange';
                svc.isReadyForPayment = true;
                active.push(svc);
            } else if (svc.status === "Closed") {
                svc.color = 'red';
                past.push(svc);
            }
        });
        console.log("Active svcs inget svcs off: ");
        console.log(active);
        setActiveSvc(active);
        setPastSvc(past);
    }

    async function getSvcsBookedAndPruneThem() {
        let active = [];
        let past = [];
        document.getElementById('upcommingSvcscontainer').style.display = 'block';
        document.getElementById('pastSvcscontainer').style.display = 'block';
        document.getElementById('activeOnlySvcscontainer').style.display = 'none';

        const svcsOffrd = await getSvcsAsCustomer(userId, token);
        console.log("Services that were booked by this user are: ", svcsOffrd.data);

        svcsOffrd.data.forEach((svc) => {
            console.log(svc.status);
            svc.isServiceProvider = false;
            svc.isCustomer = true;
            if (svc.status === "Booked") {
                svc.color = 'green';
                svc.isBooked = true;
                active.push(svc);
            } else if (svc.status === "Ready for payment") {
                svc.color = 'orange';
                svc.isReadyForPayment = true;
                active.push(svc);
            } else if (svc.status === "Closed") {
                svc.color = 'red';
                past.push(svc);
            }
        });
        setActiveSvc(active);
        setPastSvc(past);
    }

    // -------- React hooks --------
    useEffect(() => {
        const fetchProfileData = async () => {
            console.log(
                `useffect got back user id as: ${userId} and token as: ${token}`
            );
            console.log("Getting user profile details");
            const userDetResponse = await getUserProfileDetails(userId, token);
            console.log("User response received: ", userDetResponse);
            setUserDetails(userDetResponse.data);
            setCharities(userDetResponse.data.Charities);

            console.log("Get services provided by the user: ");
            //await getSvcsOffrdAndPruneThem();
            await getActiveOblySvcByUsrAndPruneThem();
        };

        fetchProfileData();
    }, []);

    // --------  click handlers --------

    const handleActiveSvcClick = async (e) => {
        setActiveTab('open');
        setLblText("");
        setlblcolor("");

        await getActiveOblySvcByUsrAndPruneThem();
    }

    const handleSvcOffrdClick = async (e) => {
        setActiveTab('Offered');
        setActiveOnlySvc([]);
        setLblText("");
        setlblcolor("");


        await getSvcsOffrdAndPruneThem();
    }

    const handleSvcBookedClick = async (e) => {
        setActiveTab('Booked');
        setLblText("");
        setlblcolor("");


        setActiveOnlySvc([]);
        await getSvcsBookedAndPruneThem();
    }

    const handleBtnSubmit = async (e, action) => {
        const svcId = e.currentTarget.dataset.svcId;

        console.log("Done btn clicked for", e);
        console.log("Updating status for svc with id: ", svcId);
        console.log("Action received: ", action);
        const response = await updateSvcRecord(svcId, action, token);
        console.log('response from PUT call');
        //TODO: Feedback to the user that the update was successful and refresh the page.
        if (response.status === 200) {
            setLblText("Service status updated successfully");
            setlblcolor('blue');
            await getSvcsOffrdAndPruneThem();
            // navigate('/profile')
        } else {
            setLblText("Error when trying to update the service state to Done state.");
            setlblcolor("red");
            // setLblText("Failed to update service status");
            // setlblcolor('red');
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

    {/* <FontAwesomeIcon icon={faStar} />  */ }

    return (
        <>
            <h1 id='profileHeader'>My Profile</h1>
            <p id="errMsg1" style={{ color: lblcolor, textWrap: 'wrap' }}>{lblText}</p>
            <div className="container-fluid profilePageContainer">
                <div className='row'>
                    <div className='col col-md-3 col-sm-6 col-12 userDetailsSection'>
                        <div className='userPicAndPersonalDetails'>

                            <img className="profilePicImg" src={userDetails.profileImgUrl} alt="profile pic" />
                            <div className='userPersonalDetails'>
                                <h5 className="personname" style={{ margin: '0px', marginBottom: '1rem' }}>

                                    {userDetails.firstName} {" "} {userDetails.lastName}</h5>
                                {/* <p style={{ fontSize: '0.8rem' }} ><FontAwesomeIcon icon={faStar} /> {userDetails.ratings}</p> */}
                                <p className="userDet">{userDetails.profession}</p>
                                <p className="userDet"> <StarOutline
                                    color={'#00000'}
                                    title={"ratings"}
                                    height="15px"
                                    width="15px"
                                />{" "}{userDetails.ratings}</p>
                                <p className="userDet pb-2"><MailOutline
                                    color={'#00000'}
                                    title={"email contact"}
                                    height="15px"
                                    width="15px"
                                />
                                    {" "}{userDetails.email}</p>
                            </div>
                        </div>
                        {/* <p className="aboutMe">{userDetails.aboutMe}</p>
                        <div className='userCharities'>
                            {
                                charities.map((ch) => (
                                    <img className="chLogo" key={ch.id} src={ch.logoImgUrl} alt="charity logo"></img>
                                ))
                            }
                        </div> */}
                        {/* defaultActiveKey="0" */}
                        <Accordion flush style={{ background: 'var(--light_gray)' }}>
                            <Accordion.Item className="kitaccitem" eventKey="0">
                                <Accordion.Header className="userProfileAccordionItem" style={{ backgroundColor: "#ebf2ea" }} >About Me</Accordion.Header>
                                <Accordion.Body>
                                    {userDetails.aboutMe}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className="kitaccitem" eventKey="1">
                                <Accordion.Header className="userProfileAccordionItem">Charities</Accordion.Header>
                                <Accordion.Body className='userCharities'>
                                    {
                                        charities.map((ch) => (
                                            <img className="chLogo" key={ch.id} src={ch.logoImgUrl} alt="charity logo"></img>
                                        ))
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className='col col-md-8 col-sm-6 col-12 userSvcsDetailsSection' style={{ justifyContent: 'center' }}>
                        <Nav fill variant="tabs" activeKey={activeTab}>
                            <Nav.Item>
                                <Nav.Link className="usrSvcCat" eventKey="open" onClick={(e) => handleActiveSvcClick(e)}><h6>Active Posts</h6></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="usrSvcCat" eventKey="Offered" onClick={(e) => handleSvcOffrdClick(e)}><h6>Services Offered</h6></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="usrSvcCat" eventKey="Booked" onClick={(e) => handleSvcBookedClick(e)}><h6>Services Booked</h6></Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <div id='activeOnlySvcscontainer'>


                            <div id="acticeSvcs">
                                {/* <p className='mt-5 asvcsSectionHeading'>Upcoming</p> */}

                                {
                                    activeOnlySvc.map((svc) => (
                                        <SummaryCard
                                            key={svc.id}
                                            id={svc.id}
                                            title={svc.title}
                                            serviceDesc={svc.description}
                                            serviceProvideremail={svc.ServiceProvider.email}
                                            isCustomer={svc.isCustomer}
                                            isServiceProvider={svc.isServiceProvider}
                                            isBooked={svc.isBooked}
                                            isReadyForPayment={svc.isReadyForPayment}
                                            firstName={svc.ServiceProvider.firstName}
                                            lastName={svc.ServiceProvider.lastName}
                                            offerEndDate={svc.offerEndDate}
                                            basePrice={svc.basePrice}
                                            serviceDate={svc.serviceDate}
                                            timeLeft={svc.timeLeft}
                                            charityName={svc.Charity.charityName}
                                            paymentLink={svc.paymentLink}
                                            token={token}
                                            btnSubmit={handleBtnSubmit}
                                            status={svc.status}
                                            color={svc.color}
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <div id='upcommingSvcscontainer'>
                            <div id="upcommingSvcs">
                                <p className='svcsSectionHeading'>Upcoming</p>

                                {activeSvc.map((svc) => (
                                    <SummaryCard
                                        key={svc.id}
                                        id={svc.id}
                                        serviceDesc={svc.description}
                                        serviceProvideremail={svc.ServiceProvider.email}
                                        customerEmail={svc.Customer.email}
                                        title={svc.title}
                                        isCustomer={svc.isCustomer}
                                        isServiceProvider={svc.isServiceProvider}
                                        isBooked={svc.isBooked}
                                        isReadyForPayment={svc.isReadyForPayment}
                                        firstName={svc.ServiceProvider.firstName}
                                        lastName={svc.ServiceProvider.lastName}
                                        offerEndDate={svc.offerEndDate}
                                        basePrice={svc.basePrice}
                                        serviceDate={svc.serviceDate}
                                        timeLeft={svc.timeLeft}
                                        charityName={svc.Charity.charityName}
                                        paymentLink={svc.paymentLink}
                                        token={token}
                                        btnSubmit={handleBtnSubmit}
                                        status={svc.status}
                                        color={svc.color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div id='pastSvcscontainer'>
                            <div id="pastSvcs">
                                <p className='svcsSectionHeading'>History</p>
                                {
                                    pastSvc.map((svc) => (
                                        <SummaryCard
                                            key={svc.id}
                                            id={svc.id}
                                            title={svc.title}
                                            serviceDesc={svc.description}
                                            serviceProvideremail={svc.ServiceProvider.email}
                                            customerEmail={svc.Customer.email}
                                            isCustomer={svc.isCustomer}
                                            isServiceProvider={svc.isServiceProvider}
                                            isBooked={svc.isBooked}
                                            offerEndDate={svc.offerEndDate}
                                            isReadyForPayment={svc.isReadyForPayment}
                                            firstName={svc.ServiceProvider.firstName}
                                            lastName={svc.ServiceProvider.lastName}
                                            basePrice={svc.basePrice}
                                            serviceDate={svc.serviceDate}
                                            timeLeft={svc.timeLeft}
                                            charityName={svc.Charity.charityName}
                                            token={token}
                                            status={svc.status}
                                            color={svc.color}
                                        />
                                    ))
                                }</div>
                        </div>

                    </div>
                    <a href="/payment/Amrita Nair/charity/Red Cross"><button>pay</button></a>
                </div>

            </div>
        </>
    );
}
