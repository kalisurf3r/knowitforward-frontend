import { useParams } from 'react-router-dom';
import { HeartOutline, ArrowBackOutline } from 'react-ionicons';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './Payment.css';
import { useEffect } from 'react';

export default function Payment() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token: ", token);

        if (!token) {
            navigate('/');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;

            if (Date.now() >= expirationTime) {
                console.error("Invalid token");
                navigate('/');
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            navigate('/');
        }
    }, [navigate]); // Add navigate as a dependency

    const { username, charityname } = useParams();
    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: "center" }}>
            <h5> <HeartOutline
                color={'#eb24a2'}
                beat
                height="50px"
                width="50px"
            />
                Thank you {username} for your donation to the charity: {charityname}
                <HeartOutline
                    color={'#eb24a2'}
                    beat
                    height="50px"
                    width="50px"
                /></h5>
            <a href="/profile">
                <button id="backToProfile"><ArrowBackOutline
                    color={'#0f0f0f'}
                    height="25px"
                    width="25px"
                />Profile</button>
            </a>
        </div>
    </>);
};