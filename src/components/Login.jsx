import { useState } from 'react';
import { login } from "../utils/apiUtil"

export default function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [labeltext, setlabeltext] = useState('');
    const [lblcolor, setlblcolor] = useState("red");




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Before Username:', username);
            console.log('Before Password:', password);

            const response = await login({ username, password });
            if (response.status != 200) {
                setlabeltext("Error: " + response.error + " while trying to login. Try agian!");
                return;
            }
            console.log("response in handleSubmit: ", response);
            props.setUserData({ id: response.data.UserId, username: response.data.username, token: response.data.token })
            setlabeltext("Login successful!");
            setlblcolor("blue");
            // TODO: Refresh page and scroll to the top of the page
            setUsername("");
            setPassword("");
        } catch (err) {
            setlabeltext("Unexpected error: " + err + " while trying to login. Try again!");
            setlblcolor("red"); // If error too long it does not wrap
        }
    };

    const handleUnameChange = (e) => {
        setUsername(e.target.value);
        setlabeltext("");
    }

    const handlePwdChange = (e) => {
        setPassword(e.target.value);
        setlabeltext("");
    }


    return (
        <div id="login-form">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='username'
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={handleUnameChange}
                    required></input>
                <input
                    placeholder='password'
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePwdChange}
                    required
                ></input>
                <label id="loginmsg" style={{ color: lblcolor, textWrap: 'wrap', maxWidth: '400px', textAlign: 'left' }}>{labeltext}</label>
                <button type="submit" id="loginBtn" className="btn text-center">Login</button>
            </form>
        </div>
    );
}
