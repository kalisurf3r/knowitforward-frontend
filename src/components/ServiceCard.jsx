import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ServiceCard.css';
import redCrossLogo from '../../public/logos/red-cross-logo.png';
import tempPic from '../../public/hands.png';

export default function ServiceCard() {

    return (
        <div className="card cardStyle"  >
            <Card style={{ width: '300px' }}>
                <Card.Title className='svc-card-title'>1 hr Math Tutoring | 5th Grade</Card.Title>
                <div className='svc-card-container'>
                    <img className='svc-card-img' src={tempPic} alt="" />
                </div>
                <Card.Body className='svc-card-body'>
                    <Card.Text className='svc-card-provider'>
                        John Doe
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className='list-group-item'>Cost: $50</ListGroup.Item>
                    <ListGroup.Item className='list-group-item'>Date of Service: 09/12/24</ListGroup.Item>
                    <ListGroup.Item className='list-group-item'>Time Left: 12h</ListGroup.Item>
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
                    <Button className='svc-card-button' >Book</Button>
                </Card.Link>
            </Card>
        </div>
    )
}

//* remember to set props for: logo, description, and total donated