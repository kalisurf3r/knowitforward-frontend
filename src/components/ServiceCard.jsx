import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ServiceCard.css';
import redCrossLogo from '../../public/logos/red-cross-logo.png';
import tempPic from '../../public/hands.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ServiceModal from './ServiceModal';

export default function ServiceCard(props) {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    return (
        <div className="card cardStyle" key={props.id} >
            <Card key={props.id} style={{ width: '250px' }}>

                <Card.Title className='svc-card-title'>{props.serviceTitle}</Card.Title>
                <div>
                    <div className='svc-card-top-container'>
                        <div className='svc-card-img-container'>
                            <img className='svc-card-img' src={props.serviceImg} alt="" />
                        </div>
                        <div>
                            <Card.Text className='svc-card-provider'>
                                {props.serviceProviderFirstName}{" "}{props.serviceProviderLastName}
                            </Card.Text>
                            <Card.Text className='svc-card-provider'>
                                {props.serviceRating}⭐️
                            </Card.Text>
                        </div>
                    </div>
                </div>
                <div className="svccardlistgroup">
                    <ListGroup className="list-group-flush ">
                        <ListGroup.Item className='list-group-item  svccardlistgroupitem'><FontAwesomeIcon icon={faDollarSign} />
                            {"   "}{props.serviceCost}
                        </ListGroup.Item>
                        <ListGroup.Item className='list-group-item svccardlistgroupitem'><FontAwesomeIcon icon={faCalendar} />
                            <span className='service-date'>{"   "}{new Date(props.serviceDate).toDateString()}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='list-group-item svccardlistgroupitem'><FontAwesomeIcon icon={faHourglassEnd} />
                            {"   "}{props.serviceTimeLeft}
                        </ListGroup.Item>
                    </ListGroup>
                    {/* <div className='svc-card-container'> */}
                    <img className='svc-card-logo' src={props.charityLogo} alt="" />
                    {/* </div> */}
                </div>
                <Card.Text className='svc-card-text'>
                    {props.serviceDesc}
                </Card.Text>
                {
                    (props.testState) ? '' : (

                        <ServiceModal show={showModal} marginleft='2px' fontsize='9pt' marginleft2='0.2rem' handleClose={handleCloseModal} serviceDesc={props.serviceDesc} serviceProvideremail={props.serviceProvideremail} />

                    )
                }
                {
                    (props.testState) ? '' : (
                        <Card.Link href="#" className='svc-card-button-container'>
                            {/* CONDITIONAL RENDERING: only show 'Book' button when use is logged in */}
                            {props.isLoggedIn ? (
                                <button data-svc-id={props.serviceId} fontsize='9pt' className='svc-card-button' onClick={(e) => props.btnSubmit(e, "book")}>
                                    Book
                                </button>
                            ) : (<></>)}
                        </Card.Link>
                    )
                }
            </Card >


        </div >
    )
}
