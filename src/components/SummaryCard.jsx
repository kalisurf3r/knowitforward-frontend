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




export default function SummaryCard(props) {
    console.log("Got back props: ", props);




    const handleDoneBtnClick = async (e) => {
        const svcId = e.target.dataset.svcId;
        console.log("Done btn clicked for", e);
        console.log("Updating status for svc with id: ", svcId);
        const response = await updateSvcRecord(svcId, 'Done', props.token);
        if (response.ok) {
            setLblText("Service status updated successfully");
        } else {
            setLblText("Failed to update service status");
        }
    }

    const handlePayBtnClick = async (e) => {
        const svcId = e.target.dataset.svcId;
        console.log("Pay btn clicked for", e);
        console.log("Updating status for svc with id: ", svcId);

    }

    return (
        <>


            {

                <div className='svcCard' key={props.id}>
                    <div>
                        <p className='card-title'>{props.title}</p>
                        <div className="card-content">
                            <ul className="card-attributes">
                                <li className='card-attribute'>
                                    <FontAwesomeIcon icon={faCircle} />
                                    <span style={{ fontWeight: '300' }}>{props.status}</span>
                                </li>
                                <li className='card-attribute'>
                                    <FontAwesomeIcon icon={faCalendar} />
                                    <span style={{ fontWeight: '300' }}>{new Date(props.serviceDate).toDateString()}</span>
                                </li>
                                <li className='card-attribute'>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                    <span style={{ fontWeight: '300' }}>More Info</span>
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
                                        height="25px"
                                        width="25px"
                                    />

                                </span>
                            </div>

                        ) : (<></>)
                    }
                    {
                        props.isCustomer && props.isReadyForPayment ? (
                            <div className="custbtnHolders">
                                <a href={props.paymentLink} target='_blank'>
                                    {/* <Tooltip id="my-tooltip1" />  data-tooltip-id="my-tooltip1" data-tooltip-content="Click to pay"*/}
                                    <button data-svc-id={props.id} onClick={(e) => handlePayBtnClick(e)} id='payBtn'>Pay</button>
                                </a>
                            </div>

                        ) : (<></>)
                    }

                </div >

            }


        </>
    );
}