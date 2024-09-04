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

    const onOptionChangeCat = e => {
        setCategorySelection(e.target.value)
    }
    const onOptionChangeChar = e => {
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
                        <div className='filter-categories'>
                            <h5>Categories</h5>
                            <div className="radio mb-3">
                                <label>
                                    <input key="categoryAll" type="radio" value="all-categories" name="category"
                                        onChange={onOptionChangeCat}
                                        className='radio-buttons'
                                    />
                                    All Categories
                                </label>
                            </div>
                            {categories.map((category) => (
                                <div className="radio mb-3">
                                    <label>
                                        <input
                                            key="categoryId" type="radio"
                                            value={category.categoryName}
                                            name="category"
                                            checked={category === category.categoryName}
                                            onChange={onOptionChangeCat}
                                            className='radio-buttons'
                                        />
                                        {category.categoryName}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className='filter-charities'>
                            <h5>Charities</h5>
                            <div className="radio mb-3">
                                <label>
                                    <input
                                        key="charityAll"
                                        type="radio"
                                        value="all-charities"
                                        name="charity"
                                        onChange={onOptionChangeChar}
                                        className='radio-buttons'
                                    />
                                    All Charities
                                </label>
                            </div>
                            {charities.map((charity) => (
                                <div className="radio mb-3">
                                    <label>
                                        <input
                                            key="charityId" type="radio"
                                            value={charity.charityName}
                                            name="charity"
                                            checked={charity === charity.charityName}
                                            onChange={onOptionChangeChar}
                                            className='radio-buttons'
                                        />
                                        {charity.charityName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='services-page-cards'>
                        {services.map((service) => (
                            <div>
                                <ServiceCard
                                    key={service.id}
                                    serviceTitle={service.title}
                                    serviceImg={service.ServiceProvider.profileImgUrl}
                                    serviceProviderFirstName={service.ServiceProvider.firstName}
                                    serviceProviderLastName={service.ServiceProvider.lastName}
                                    serviceRating={service.ServiceProvider.ratings}
                                    serviceCost={service.basePrice}
                                    serviceDate={service.serviceDate}
                                    serviceEndDate={service.ServiceProvider.offerEndDate}
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

// serviceProvider={fullNamesArray}
