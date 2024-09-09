import { Link, useNavigate } from "react-router-dom";
import "./SummaryCard.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faCircleInfo, faCircleCheck, faBan, faCircle } from "@fortawesome/free-solid-svg-icons";
import { updateSvcRecord } from "../utils/apiUtil";
import { useState } from "react";
import { CheckmarkCircleOutline, BanOutline } from 'react-ionicons';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import ServiceModal from "./ServiceModal";




export default function SummaryCard(props) {
    console.log("Got back props: ", props);

    return (
        <>


            {

                <div className='svcCard' key={props.id}>
                    <div>
                        <p className='card-title'>{props.title}</p>
                        <div className="card-content">
                            <ul className="card-attributes">
                                <li className='card-attribute'>
                                    <span style={{ color: props.color }}> <FontAwesomeIcon icon={faCircle} /></span>
                                    <span style={{ fontWeight: '300' }}>{props.status}</span>
                                </li>
                                <li className='card-attribute'>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span style={{ fontWeight: '300' }}>{new Date(props.serviceDate).toDateString()}</span>
                                </li>
                                <li className='card-attribute'>
                                    {/* <FontAwesomeIcon icon={faCircleInfo} />
                                    <span style={{ fontWeight: '300' }}>More Info</span> */}
                                    <ServiceModal
                                        price={props.basePrice}
                                        offerEndDate={props.offerEndDate}
                                        serviceDate={props.serviceDate}
                                        customerEmail={props.customerEmail}
                                        serviceDesc={props.serviceDesc}
                                        serviceProvideremail={props.serviceProvideremail} />
                                    {/* TODO: required info */}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {
                        props.isServiceProvider && props.isBooked ? (
                            <div className="spbtnHolders">
                                <Tooltip id="my-tooltip" />
                                <span data-svc-id={props.id} onClick={(e) => props.btnSubmit(e, "Done")}>
                                    {/* <FontAwesomeIcon icon={faCircleCheck} /> */}
                                    {/* data-tooltip-id="my-tooltip" data-tooltip-content="Mark as done" */}
                                    <CheckmarkCircleOutline
                                        color={'#16b120'}
                                        title="Mark as done"
                                        height="25px"
                                        width="25px"
                                    />
                                </span>
                                {/* <span data-tooltip-id="my-tooltip" data-tooltip-content="Cancel service" data-svc-id={props.id} onClick={(e) => props.btnSubmit(e, "Cancel")}> */}
                                <span data-svc-id={props.id} onClick={(e) => props.btnSubmit(e, "Cancel")}>
                                    {/* <FontAwesomeIcon icon={faBan} /> */}
                                    <BanOutline
                                        color={'#b11616'}
                                        title="Cancel service"
                                        height="23px"
                                        width="23px"
                                    />

                                </span>
                            </div>

                        ) : (<></>)
                    }
                    {
                        props.isCustomer && props.isReadyForPayment ? (
                            <div className="custbtnHolders">
                                <a href={props.paymentLink}>
                                    {/* <Tooltip id="my-tooltip1" />  data-tooltip-id="my-tooltip1" data-tooltip-content="Click to pay"*/}
                                    <button data-svc-id={props.id} id='payBtn'>Pay</button>
                                </a>
                            </div>

                        ) : (<></>)
                    }

                </div >

            }


        </>
    );
}