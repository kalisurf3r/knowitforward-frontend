import { Link } from "react-router-dom";
import "./SummaryCard.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faCircleInfo } from "@fortawesome/free-solid-svg-icons";


export default function SummaryCard(props) {
    console.log("Got back props: ", props);

    return (
        <>


            {

                <div className='svcCard' key={props.id}>

                    <div className="card-content">
                        {/* <div className='name-tags'>
                            {props.isCustomer ? (
                                <span className='name'>
                                    {props.firstName} {" "} {props.lastName}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div> */}
                        <p className='card-title'>{props.title}</p>
                        <ul className="card-attributes">
                            {/* <li className="card-attribute">
                                <span style={{ color: 'red' }}><FontAwesomeIcon icon={faDollarSign} /></span>
                                <span>{props.basePrice}</span>
                            </li> */}
                            <li className='card-attribute'>
                                <FontAwesomeIcon icon={faCalendar} />
                                <span>{new Date(props.serviceDate).toDateString()}</span>
                            </li>
                            <li className='card-attribute'>
                                <FontAwesomeIcon icon={faCircleInfo} />
                                <span>More Info</span>
                                {/* TODO: required info */}
                            </li>
                            {/* {
                                props.timeLeft ? (
                                    <li className='card-attribute'>
                                        <FontAwesomeIcon icon={faHourglassEnd} />
                                        <span>{props.timeLeft}</span>
                                    </li>
                                ) : (<></>)
                            }

                            <li className="card-attribute">
                                <FontAwesomeIcon icon={faHandHoldingHeart} />
                                <span>{props.charityName}</span>
                            </li> */}

                        </ul>
                        {
                            props.isServiceProvider && props.isBooked ? (
                                <div class="spbtnHolders">
                                    <button id='doneBtn'>Done</button>
                                    <button id='cancelBtn'>Cancel</button>
                                </div>

                            ) : (<></>)
                        }
                        {
                            props.isCustomer && props.isReadyForPayment ? (
                                <div class="custbtnHolders">
                                    <button id='payBtn'>Pay</button>
                                </div>

                            ) : (<></>)
                        }

                    </div>

                </div >

            }


        </>
    );
}