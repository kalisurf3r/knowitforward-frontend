import { Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {useState } from 'react';


export default function ServiceCard(props) {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const modalHeaderStyle = {
        backgroundColor: '#9dbc98',
    }

    const showMoreStyle = {
        color: 'blue',
        cursor: 'pointer',
    }

    return (
        <div>
            <li onClick={handleShowModal} style={showMoreStyle}>
                Show More
            </li>
            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton style={modalHeaderStyle}>
                <Modal.Title>Service Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.serviceDesc}</Modal.Body>
            <Modal.Body>
                <p>Contact Servicer: </p>
                <a href={`mailto:${props.serviceProvideremail}`}>{props.serviceProvideremail}</a>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}