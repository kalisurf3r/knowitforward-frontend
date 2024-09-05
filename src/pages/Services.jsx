import './Services.css'
import ServiceCard from '../components/ServiceCard'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'

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

    return (
        <>
            <div className='services-page'>
                <div className='services-header'>
                    <h1>Book a Service</h1>
                </div>
                <div className='services-content'>
                    <div className='services-filters'>
                        <h2 className='filter-title'>Filters</h2>
                        <div className='filter-sections'>
                            <div className='filter-categories'>
                                <h5>Categories</h5>
                                <div className="radio">
                                    <label>
                                        <input key="categoryAll" type="radio" value="all-categories" name="category"
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
                                                type="radio"
                                                value={category.categoryName}
                                                name="category"
                                                checked={category === category.categoryName}
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
                                                type="radio"
                                                value={charity.charityName}
                                                name="charity"
                                                checked={charity === charity.charityName}
                                                onChange={filterValueChar}
                                                className='radio-buttons'
                                            />
                                            {charity.charityName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='services-page-cards'>
                        {services
                            // .filter(services.Category.categoryName => services.Category.categoryName.match((filterValueCat, "i")))
                            .map((service) => (
                                <div>
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id}
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
                                    />
                                </div>
                            ))}
                    </div>
                </div>

            </div>

        </>
    );
}