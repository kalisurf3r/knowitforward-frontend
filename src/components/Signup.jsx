import {useState} from 'react';
import UploadWidget from './UploadWidget';

export default function Signup() {
    const buttonStyle = {
        backgroundColor: '#FFBC2C',
        color: 'black'
    };
    
    const modalTitleStyle = {
        backgroundColor: '#9DBC98'
    };

    const modalBodyStyle = {
        backgroundColor: '#F0F0F0'
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   const [profession, setProfession] = useState('');
   const [about, setAbout] = useState('');

    return (
      <div>
        <button type="button" className="btn" style={buttonStyle} data-bs-toggle="modal" data-bs-target="#exampleModal">
          Sign up
        </button>
        
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={modalTitleStyle}>
                <h1 className="modal-title fs-5"  id="exampleModalLabel">Sign up</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={modalBodyStyle}>
               <form action="">
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="profession"
                        placeholder="Profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                    <textarea
                        type="text"
                        className="form-control"
                        id="about"
                        placeholder="About"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-3">
                   <UploadWidget />
                    </div>
               </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" style={buttonStyle}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

