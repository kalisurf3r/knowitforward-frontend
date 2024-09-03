import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ServiceCard.css';
import redCrossLogo from '../../public/logos/red-cross-logo.png';
import tempPic from '../../public/hands.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faHandHoldingHeart, faHourglassEnd, faList } from "@fortawesome/free-solid-svg-icons";


export default function ServiceCard() {

    return (
        <div className="card cardStyle"  >
            <Card style={{ width: '250px' }}>
                <Card.Title className='svc-card-title'>1 hr Math Tutoring | 5th Grade</Card.Title>
                <Card.Body className='svc-card-top-container'>
                    <img className='svc-card-img' src={tempPic} alt="" />
                    <div>
                        <Card.Text className='svc-card-provider'>
                            John Doe
                        </Card.Text>
                        <Card.Text className='svc-card-provider'>
                            ⭐️⭐️⭐️⭐️⭐️
                        </Card.Text>
                    </div>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faDollarSign} /> $50</ListGroup.Item>
                    <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faCalendar} /> 09/12/24</ListGroup.Item>
                    <ListGroup.Item className='list-group-item'><FontAwesomeIcon icon={faHourglassEnd} /> 12h</ListGroup.Item>
                    <ListGroup.Item className='svc-card-container'>
                        <img className='svc-card-logo' src={redCrossLogo} alt="" />
                    </ListGroup.Item>
                </ListGroup>
                <Card.Text className='svc-card-container'>
                    <p className='svc-card-text'>
                        We will cover key topics such as fractions, decimals, multiplication, division, and basic geometry. The session will include problem-solving exercises and tips to improve math skills. The goal is to help your child strengthen their understanding of these concepts and build confidence in their math abilities.
                    </p>
                </Card.Text>
                <Card.Link href="#" className='svc-card-container'>
                    {/* CONDITIONAL RENDERING: only show 'Book' button when use is logged in */}
                    <button className='svc-card-button' >Book</button>
                </Card.Link>
            </Card>
        </div>
    )
}

//* remember to set props for: logo, description, and total donated