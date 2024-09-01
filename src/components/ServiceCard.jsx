import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ServiceCard.css'
import redCrossLogo from '../../public/logos/red-cross-logo.png'

export default function ServiceCard() {

    return (
        <div className="card cardStyle"  >
            {/* <div className="card-body">
        <div className="d-flex justify-content-center">
        <img className='charityLogoStyle' src="" alt="Unicef"/>
        </div>
        <p className="card-text text-center">Insert Card Desc</p>
        <h6 className="text-center donatedStyle">Total Donated:<span style={{ backgroundColor: '#FFBC2C'}}> Insert $$$ Here</span></h6>
      </div> */}
            <Card style={{ width: '300px' }}>
                <Card.Title className='svc-card-title'>1 hr Math Tutoring | 5th Grade</Card.Title>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Text className='svc-card-provider'>
                        John Doe
                    </Card.Text>
                    <Card.Text className='svc-card-text'>
                    We will cover key topics such as fractions, decimals, multiplication, division, and basic geometry. The session will include problem-solving exercises and tips to improve math skills. The goal is to help your child strengthen their understanding of these concepts and build confidence in their math abilities.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cost: $50</ListGroup.Item>
                    <ListGroup.Item>Date: 09/12/24</ListGroup.Item>
                    <ListGroup.Item>Time Left: 12h</ListGroup.Item>
                    <ListGroup.Item>
                    <img className='svc-card-logo' src={redCrossLogo} alt="" />
                    </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">
                    <button className='svc-card-button'>Book</button>
                    </Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

//* remember to set props for: logo, description, and total donated