import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faCircleInfo, faCircleCheck, faBan, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


export default function ServiceModal(props) {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const modalHeaderStyle = {
        backgroundColor: '#9dbc98',
    }

    const showMoreStyle = {
        // color: 'blue',
        cursor: 'pointer',
        listStyle: 'none'
    }

    console.log("modal props: ", props);
    // onClick={handleShowModal} style={showMoreStyle}
    return (
        <div>
            {/* <ul>
                <li style={showMoreStyle}>

                </li>
            </ul> */}
            <FontAwesomeIcon icon={faCircleInfo} />{" "}
            <span onClick={handleShowModal} style={{ fontWeight: '300', marginLeft: '0.7rem', cursor: 'pointer', }}>More Info</span>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={modalHeaderStyle}>
                    <Modal.Title>Service Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.serviceDesc}</p>
                    <p><b>Contact Servicer:</b> <a href={`mailto:${props.serviceProvideremail}`}>{props.serviceProvideremail}</a></p>
                    {
                        props.price ? (<>
                            <p style={{ fontWeight: '300' }}><b>Price:</b> ${props.price} </p>
                        </>) : (<></>)
                    }
                    {
                        props.customerEmail ? (
                            <p><b>Contact Customer:</b> <a href={`mailto: ${props.customerEmail}`}>{props.customerEmail}</a></p>
                        ) : (<></>)

                    }
                    {
                        props.serviceDate ? (<>
                            <p style={{ fontWeight: '300' }}><b>Service Date:</b>  {new Date(props.serviceDate).toDateString()}</p>
                        </>) : (<></>)
                    }
                    {
                        props.offerEndDate ? (<>
                            <p style={{ fontWeight: '300' }}><b>Offer End Date:</b>  {new Date(props.offerEndDate).toDateString()}</p>
                        </>) : (<></>)
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}