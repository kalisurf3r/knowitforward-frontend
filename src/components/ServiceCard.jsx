import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ServiceCard.css';
import redCrossLogo from '../../public/logos/red-cross-logo.png';
import tempPic from '../../public/hands.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faHandHoldingHeart, faHourglassEnd, faList } from "@fortawesome/free-solid-svg-icons";


export default function ServiceCard(props) {


    // CALCULATE TIME LEFT:
    // for (let i = 0; i < {props.serviceEndDate}.length; i++) {
    //     const offerEndDate = props.serviceEndDate[i];
    //     const now = Date();
    //     const hoursLeft = Math.floor(((props.serviceEndDate[i]-now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     console.log(hoursLeft)
    // }


    return (
        <div className="card cardStyle"  >
            <Card style={{ width: '250px' }}>

                <Card.Title className='svc-card-title'>{props.serviceTitle}</Card.Title>
                <Card.Body className='svc-card-top-container'>
                    <img className='svc-card-img' src={props.serviceImg} alt="" />
                    <div>
                        <Card.Text className='svc-card-provider'>
                            {props.serviceProviderFirstName}{" "}{props.serviceProviderLastName}
                        </Card.Text>
                        <Card.Text className='svc-card-provider'>
                            {props.serviceRating}⭐️
                        </Card.Text>
                    </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <div>
                        <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faDollarSign} />
                        {"   "}{props.serviceCost}
                        </ListGroup.Item>
                        <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faCalendar} /> 
                            <span className='service-date'>{"   "}{new Date(props.serviceDate).toDateString()}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faHourglassEnd} />
                        {"   "}12h
                        </ListGroup.Item>
                    </div>
                    <ListGroup.Item className='svc-card-container'>
                        <img className='svc-card-logo' src={props.charityLogo} alt="" />
                    </ListGroup.Item>
                </ListGroup>
                <Card.Text className='svc-card-text'>
                        {props.serviceDesc}
                </Card.Text>
                <Card.Link href="#" className='svc-card-container'>
                    {/* CONDITIONAL RENDERING: only show 'Book' button when use is logged in */}
                    <button className='svc-card-button'>
                        Book
                    </button>
                </Card.Link>
            </Card>
        </div>
    )
}

//* remember to set props for: logo, description, and total donated