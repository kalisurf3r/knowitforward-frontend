import './Home.css'
import homeImg from '../../public/heart-hands.jpeg'
import heartImg from '../../public/Heart-hand-shake.svg'
// import Login from '../components/Login'

export default function Home() {
    return (
        <div>
            <div>
                <img className="home-img" src={homeImg} alt="image of many hands creating a heart" />
                <h2 className='tagline'>Donate the gift of time</h2>
            </div>
            <div className='mission-section'>
                <img className="heart-img" src={heartImg} alt="image of many hands creating a heart" />
                <p className='mission-stmt'><strong className='bold'>KnowItForward</strong> connects skilled professionals with charitable causes. Experts in fields like music, tutoring, and resume reviewing volunteer their time to support meaningful initiatives. Join us in donating the gift of time to make a difference.</p>
            </div>
            <div className='login-section'>
                {/* <Login /> */}
                <p>login form</p>
            </div>
            <div className='services-section'>
                <p>services section</p>
            </div>
            <div className='charities-section'>
                <p>charities section</p>
            </div>
        </div>
    );
}