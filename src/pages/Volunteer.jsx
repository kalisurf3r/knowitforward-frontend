import "./volunteer.css";
import { useState, useEffect } from "react";

export default function Volunteer() {

    const [volunteer, setVolunteer] = useState({});
    const [category, setCategory] = useState({});
    const [charity, setCharity] = useState({});
    const [user, setUser] = useState({});

    const userFetch = async () => {
        const response = await fetch("http://localhost:3004/api/user/login");
        const data = await response.json();
        setUser(data);
    }

    const categoryFetch = async () => {
        const response = await fetch("http://localhost:3004/api/cateogries");
        const data = await response.json();
        setCategory(data);
    }

    const charityFetch = async () => {
        const response = await fetch("http://localhost:3004/api/charities");
        const data = await response.json();
        setCharity(data);
    }

    useEffect(() => {
        userFetch();
        categoryFetch();
        charityFetch();
    }, []);



    const imgStyle = {
        width: "850px",
        height: "250px",
    };
    
    const containerStyle = {
        display: "flex",
        alignItems: "center", 
        gap: "40px", 
        marginTop: "80px",
        marginLeft: "60px",
    };
    
    const textContainerStyle = {
        display: "flex",
        flexDirection: "column", 
        fontFamily: "Rubik, sans-serif",
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
        justifyContent: "center",
    };
    
    const formGroupStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    };
    
    const labelStyle = {
        width: "100px", 
        textAlign: "center",
        paddingRight: "10px",
        paddingLeft: "10px",
    };
    
    const inputStyle = {
        flex: "1",
        borderRadius: "10px",
        border: "none",
        maxWidth: "600px",
       
    };

    const input2Style = {
        flex: "1",
        borderRadius: "10px",
        border: "none",
        maxWidth: "400px",
       
    }

    const textAreaStyle = {
        flex: "1",
        height: "100px",
        borderRadius: "10px",
        border: "none",
         maxWidth: "600px"
    };

    const buttonStyle = {
        flex: "1",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFBC2C",
        borderRadius: "10px",
        border: "none",
        maxWidth: "300px",
        padding: "10px",
    };


    return (
        <>
         <div style={containerStyle}>
                <img style={imgStyle} src="volunteer.png" alt="Volunteer" />
                <div style={textContainerStyle}>
                    <h1 className="text-center">Volunteer</h1>
                    <p className="text-center">
                        With <span className="fw-semibold">KnowItForward</span> you can donate your time by offering a service that you love and support your favorite charities at the same time.
                    </p>
                </div>
            </div>
        
        <div>
            <h3 className="text-center" style={{marginTop: "60px"}}>Tell us more about the service you're donating</h3>
        </div>

        <div className="volunteer-form">
        <form style={formStyle}>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="title">Title:</label>
                <input style={inputStyle} type="text" id="title" name="title" placeholder="title" />
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="description">Description:</label>
                <textarea style={textAreaStyle} type="description" id="description" name="description" placeholder="description"/>
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="price">Price:</label>
                <input style={input2Style} type="number" id="price" name="price" placeholder="price"/>
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="offer-end-date">Offer End Date:</label>
                <input style={input2Style} type="date" id="offer-end-date" name="offer-end-date" placeholder="end_date"/>
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="scheduled-date">Scheduled Date:</label>
                <input style={input2Style} type="date" id="scheduled-date" name="scheduled-date" placeholder="end_date"/>
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="scheduled-date">Charity:</label>
                <select style={input2Style} id="charity" name="charity">
                <option value="">Select a charity</option>
                <option value="charity1">Charity 1</option>
                <option value="charity2">Charity 2</option>
                <option value="charity3">Charity 3</option>
            </select>
            </div>
            <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="scheduled-date">Category:</label>
                <select style={input2Style} id="charity" name="charity">
                <option value="">Select a Category</option>
                <option value="charity1">Charity 1</option>
                <option value="charity2">Charity 2</option>
                <option value="charity3">Charity 3</option>
            </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: "30px"}}>
                            <button type="submit" style={buttonStyle}><span className="fw-semibold">Volunteer</span></button>
                        </div>
        </form>
        </div>
           
        </>
    );
}