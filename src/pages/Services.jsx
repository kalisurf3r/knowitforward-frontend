import './Services.css'
import ServiceCard from '../components/ServiceCard'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { updateSvcRecord } from '../utils/apiUtil';


export default function Services() {
    const servicesPageData = useLoaderData();
    const services = servicesPageData.services.data;
    const charities = servicesPageData.charities.data;
    const categories = servicesPageData.categories.data;
    console.log("Services.jsx services data: ", services);
    console.log("Services.jsx charities data: ", charities);
    console.log("Services.jsx categories data: ", categories);

    const [categorySelection, setCategorySelection] = useState('all-categories')
    const [charitySelection, setCharitySelection] = useState('all-charities')

    const filterValueCat = e => {
        setCategorySelection(e.target.value)
    }
    const filterValueChar = e => {
        setCharitySelection(e.target.value)
    }

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const navigate = useNavigate();
    const [labeltext, setlabeltext] = useState('');
    let userId;

    if (Date.now() >= expirationTime) {
        console.log("Invalid token");
        throw new Error("Invalid token cannot fetch data")
        //TODO: 
    }
    userId = decodedToken.id;
    
    const handleBtnSubmit = async (e, action) => {
        const svcId = e.currentTarget.dataset.svcId;
        console.log("Done btn clicked for", e);
        console.log("Updating status for svc with id: ", svcId);
        console.log("Action received: ", action);
        const response = await updateSvcRecord(svcId, action, token);
        console.log('response from PUT call');
        //TODO: Feedback to the user that the update was successful and refresh the page.
        if (response.status === 200) {
            // setLblText("Service status updated successfully");
            // setlblcolor('blue');
            console.log('service booked');
            setlabeltext("Booking successful!");
            setTimeout(() => {
                navigate('/profile')
              }, 2000);
                        
        } else {
        }
    };
    

    return (
        <>
            <div className='services-page'>
                <div className='services-header'>
                    <h1>Book a Service</h1>
                    <p id="signUpErrMsg" style={{ color: 'blue', textWrap: 'wrap', maxWidth: '400px', textAlign: 'left', marginTop: '10px', fontSize: '14pt', fontWeight: '500' }}>{labeltext}</p>
                </div>
                <div className='services-content'>
                    <div className='services-filters'>
                        <h2 className='filter-title'>Filters</h2>
                        <div className='filter-categories'>
                            <h5>Categories</h5>
                            <div className="radio">
                                <label>
                                    <input 
                                    key="categoryAll" 
                                    type="radio" 
                                    value="all-categories" 
                                    name="category"
                                        onChange={filterValueCat}
                                        className='radio-buttons'
                                    />
                                    All Categories
                                </label>
                            </div>
                            {categories.map((category) => (
                                <div key={category.id} className="radio">
                                    <label>
                                        <input
                                            key="categoryId" type="radio"
                                            value={category.categoryName}
                                            name="category"
                                            checked={categorySelection === category.categoryName}
                                            onChange={filterValueCat}
                                            className='radio-buttons'
                                        />
                                        {category.categoryName}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className='filter-charities'>
                            <h5>Charities</h5>
                            <div className="radio">
                                <label>
                                    <input
                                        key="charityAll"
                                        type="radio"
                                        value="all-charities"
                                        name="charity"
                                        onChange={filterValueChar}
                                        className='radio-buttons'
                                    />
                                    All Charities
                                </label>
                            </div>
                            {charities.map((charity) => (
                                <div key={charity.id} className="radio">
                                    <label>
                                        <input
                                            key="charityId" type="radio"
                                            value={charity.charityName}
                                            name="charity"
                                            checked={charitySelection === charity.charityName}
                                            onChange={filterValueChar}
                                            className='radio-buttons'
                                        />
                                        {charity.charityName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='services-page-cards'>
                        {services
                        .filter((element) => (element?.Category?.categoryName === categorySelection || categorySelection === "all-categories") && (element?.Charity?.charityName === charitySelection || charitySelection === "all-charities"))
                        .map((service) => (
                            <div key={service.id}>
                                <ServiceCard
                                    key={service.id}
                                    serviceId={service.id}
                                    serviceTitle={service.title}
                                    serviceImg={service.ServiceProvider.profileImgUrl}
                                    serviceProviderFirstName={service.ServiceProvider.firstName}
                                    serviceProviderLastName={service.ServiceProvider.lastName}
                                    serviceRating={service.ServiceProvider.ratings}
                                    serviceCost={service.basePrice}
                                    serviceDate={service.serviceDate}
                                    serviceTimeLeft={service.timeLeft}
                                    charityLogo={service.Charity.logoImgUrl}
                                    serviceDesc={service.description}
                                    btnSubmit={handleBtnSubmit}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    );
}