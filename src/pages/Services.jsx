import './Services.css'
import ServiceCard from '../components/ServiceCard'
import Form from 'react-bootstrap/Form';

export default function Services() {
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
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`All Categories`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Education`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Career`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Therapy`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Music`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Wellness`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Photography`}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>

                        <div className='filter-charities'>
                            <h5>Charities</h5>
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`All Charities`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Red Cross America`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Habitat for Humanity`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Jane Goodall Institute`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Feeding America`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`Save the Children`}
                                        />
                                        <Form.Check
                                            type={type}
                                            id={`default-${type}`}
                                            label={`UNICEF`}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                    <div className='services-page-cards'>
                        <div><ServiceCard /></div>
                        <div><ServiceCard /></div>
                        <div><ServiceCard /></div>
                        <div><ServiceCard /></div>
                        <div><ServiceCard /></div>
                        <div><ServiceCard /></div>

                    </div>
                </div>

            </div>

        </>
    );
}