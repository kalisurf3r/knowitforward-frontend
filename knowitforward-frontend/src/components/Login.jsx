import { useState } from 'react';


export default function Login() {

    const buttonStyle = {
        backgroundColor: '#FFBC2C',
        color: 'black'
    };

    const loginFormStyle = {
       fontFamily: 'Rubik, sans-serif',
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // Basic form validation
        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            
            const response = await fakeAuthService(username, password);
            if (response.success) {
               
                window.location.href = '/homepage';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        }
    };

        console.log('Username:', username);
        console.log('Password:', password);
    

    return (
        <div className="container mt-5" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                    placeholder='username'
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        style={loginFormStyle}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                    placeholder='password'
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={loginFormStyle}
                                    />
                                </div>
                                <div className='text-center'>
                                <button type="submit" className="btn w-25" style={buttonStyle}>Login</button>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
    );
}
