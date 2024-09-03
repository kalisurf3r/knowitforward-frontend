import './Services.css'
import ServiceCard from '../components/ServiceCard'
import Form from 'react-bootstrap/Form';
import { useLoaderData } from 'react-router-dom';

export default function Services() {
    const servicesPageData = useLoaderData();
    const services = servicesPageData.services.data;
    const charities = servicesPageData.charities.data;
    const categories = servicesPageData.categories.data;
    console.log("Services.jsx services data: ", services);
    console.log("Services.jsx charities data: ", charities);
    console.log("Services.jsx categories data: ", categories);

services.map((service) => (
    <ServiceCard 
    key={service.id} serviceTitle={service.title}
    />

))


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
                                    <input key="categoryAll" type="radio" value="all-categories" name="category" className='radio-buttons'/>
                                    All Categories
                                </label>
                            </div>
                            {categories.map((category) => (
                                <div className="radio mb-3">
                                    <label>
                                        <input key="categoryId" type="radio" value={category.categoryName} name="category" className='radio-buttons'/>
                                        {category.categoryName}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className='filter-charities'>
                            <h5>Charities</h5>
                            <div className="radio mb-3">
                                <label>
                                    <input key="charityAll" type="radio" value="all-charities" name="charity" className='radio-buttons'/>
                                    All Charities
                                </label>
                            </div>
                            {charities.map((charity) => (
                                <div className="radio mb-3">
                                    <label>
                                        <input key="charityId" type="radio" value={charity.charityName} name="charity" className='radio-buttons'/>
                                        {charity.charityName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='services-page-cards'>
                        {services.map((service) => (
                            <div><ServiceCard /></div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    );
}