import { Link } from "react-router-dom";
import "./HomePageServiceCard.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollarSign, faHandHoldingHeart, faHourglassEnd, faList } from "@fortawesome/free-solid-svg-icons";

function getUniqueRandomIndices(arrayLength, count) {
    let randomIndices = [];

    while (randomIndices.length < count) {
        let randomIndex = Math.floor(Math.random() * arrayLength);

        // Add the index to the array only if it's not already present
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    return randomIndices;
}

export default function HomePageServiceCard(props) {
    const cardsToDisplay = getUniqueRandomIndices(props.entries.length, 3);
    console.log("got back card indices as: ", cardsToDisplay);

    return (
        <>
            <div className="container">
                <div className="servicesContainer">
                    {
                        cardsToDisplay.map((eIdx) => (
                            <div className='svcCard' key={props.entries[eIdx].id}>
                                <Link to="/services" style={{ textDecoration: 'none' }}>
                                    <img className="profilePicImg" src={props.entries[eIdx].ServiceProvider.profileImgUrl} alt="profile pic" />
                                    <div className="card-content">
                                        <div className='name-tags'>
                                            <span className='name'>
                                                {props.entries[eIdx].ServiceProvider.firstName} {" "} {props.entries[eIdx].ServiceProvider.lastName}
                                            </span>
                                        </div>
                                        <p className='card-title'>{props.entries[eIdx].title}</p>
                                        <ul className="card-attributes">
                                            <li className="card-attribute">
                                                <span style={{ color: 'red' }}><FontAwesomeIcon icon={faDollarSign} /></span>
                                                <span>{props.entries[eIdx].basePrice}</span>
                                            </li>
                                            <li className='card-attribute'>
                                                <FontAwesomeIcon icon={faCalendar} />
                                                <span>{new Date(props.entries[eIdx].serviceDate).toDateString()}</span>
                                            </li>
                                            <li className='card-attribute'>
                                                <FontAwesomeIcon icon={faHourglassEnd} />
                                                <span>{props.entries[eIdx].timeLeft}</span>
                                            </li>
                                            <li className="card-attribute">
                                                <FontAwesomeIcon icon={faList} />
                                                <span>{props.entries[eIdx].Category.categoryName}</span>
                                            </li>
                                            <li className="card-attribute">
                                                <FontAwesomeIcon icon={faHandHoldingHeart} />
                                                <span>{props.entries[eIdx].Charity.charityName}</span>
                                            </li>

                                        </ul>

                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}



// return (
//     <>
//         <div className="container">
//             <div className="row justify-content-md-center">
//                 {
//                     cardsToDisplay.map((eIdx) => (
//                         <div className='col-md-3 col-sm-6 col-12 svcCard me-3 svcCard' key={props.entries[eIdx].id}>
//                             <Link to="/services" style={{ textDecoration: 'none' }}>
//                                 <img className="profilePicImg" src={props.entries[eIdx].ServiceProvider.profileImgUrl} alt="profile pic" />
//                                 <div className="card-content">
//                                     <div className='name-tags'>
//                                         <span className='name'>
//                                             {props.entries[eIdx].ServiceProvider.firstName} {" "} {props.entries[eIdx].ServiceProvider.lastName}
//                                         </span>
//                                     </div>
//                                     <p className='card-title'>{props.entries[eIdx].title}</p>
//                                     <ul className="card-attributes">
//                                         <li className="card-attribute">
//                                             <FontAwesomeIcon icon={faDollarSign} />
//                                             <span>{props.entries[eIdx].basePrice}</span>
//                                         </li>
//                                         <li className='card-attribute'>
//                                             <FontAwesomeIcon icon={faCalendar} />
//                                             <span>{new Date(props.entries[eIdx].serviceDate).toDateString()}</span>
//                                         </li>
//                                         <li className='card-attribute'>
//                                             <FontAwesomeIcon icon={faHourglassEnd} />
//                                             <span>{props.entries[eIdx].timeLeft}</span>
//                                         </li>
//                                         <li className="card-attribute">
//                                             <FontAwesomeIcon icon={faList} />
//                                             <span>{props.entries[eIdx].Category.categoryName}</span>
//                                         </li>
//                                         <li className="card-attribute">
//                                             <FontAwesomeIcon icon={faHandHoldingHeart} />
//                                             <span>{props.entries[eIdx].Charity.charityName}</span>
//                                         </li>

//                                     </ul>

//                                 </div>
//                             </Link>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     </>
// );