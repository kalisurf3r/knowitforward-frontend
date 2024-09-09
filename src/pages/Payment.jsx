import { useParams } from 'react-router-dom';
import { HeartOutline, ArrowBackOutline } from 'react-ionicons';
import './Payment.css';

export default function Payment(props) {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const navigate = useNavigate();
    let userId;

    if (Date.now() >= expirationTime) {
        console.error("Invalid token");
        // throw new Error("Invalid token cannot fetch data")
        navigate('/');
    }
    userId = decodedToken.id;
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