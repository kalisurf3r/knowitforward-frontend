import { useEffect, useState } from 'react';
import UploadWidget from './UploadWidget';
import { register } from '../utils/apiUtil';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Signup.css";

export default function Signup(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [aboutMe, setAbout] = useState('');
  const [labeltext, setlabeltext] = useState('');
  const [lblcolor, setlblcolor] = useState("red");
  const [profileImg, setProfileImg] = useState("");

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        firstName,
        lastName,
        email,
        username,
        password,
        profession,
        aboutMe,
        profileImgUrl: profileImg
      });
      if (response.status != 200) {
        setlabeltext("Error: " + JSON.stringify(response.error) + " while trying to register. Try agian!");
        return;
      }

      console.log("response in handle form submit: ", response);
      props.setUserData({
        id: response.data.id,
        username: response.data.username,
        token: response.data.token
      })
      setlabeltext("Register successful!");
      setlblcolor("blue");
      setFirstName("");
      setLastName("");
      setEmail("");
      setAbout("");
      setProfession("");
      setUsername("");
      setPassword("");
      setProfileImg("");
      // TODO: Automatically close modal
      setTimeout(() => {
        props.handleClose(); // Close the modal after the specified wait time
      }, 2000);
    } catch (err) {
      console.log(err);
      setlabeltext("Unexpected error" + JSON.stringify(err) + " while trying to register. Try again!");
      setlblcolor("red"); // If error too long it does not wrap
    }
  }

  useEffect(() => {
    setlabeltext("");
  }, [props.show]);



  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} style={{ fontFamily: "Montserrat, sans-serif", fontOpticalSizing: "auto" }}>
        <Modal.Header id="modalTitle" closeButton>
          <Modal.Title >Create an account </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody">
          <form onSubmit={handleSignUpFormSubmit}>
            <input
              type="text"
              className="form-control signupFormCtrl"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <input
              type="text"
              className="form-control signupFormCtrl"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <input
              type="email"
              className="form-control signupFormCtrl"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <input
              type="text"
              className="form-control signupFormCtrl"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <input
              type="password"
              className="form-control signupFormCtrl"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <input
              type="text"
              className="form-control signupFormCtrl"
              id="profession"
              placeholder="Profession(s)"
              value={profession}
              onChange={(e) => {
                setProfession(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <textarea
              type="text"
              className="form-control signupFormCtrl"
              id="about"
              placeholder="About"
              value={aboutMe}
              rows='5'
              onChange={(e) => {
                setAbout(e.target.value);
                setlabeltext("");
              }}
              required
            />
            <UploadWidget profilePic={profileImg} setProfileImg={setProfileImg} />
            <div id='profileImgContainer'>
              {profileImg && <img src={profileImg} alt="Profile" id="profileImg" />}
            </div>
            <label id="signUpErrMsg" style={{ color: lblcolor, textWrap: 'wrap', maxWidth: '400px', textAlign: 'left' }}>{labeltext}</label>
            <Button type="submit" id='signUpBtn'>Sign Up</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div >
  );
}

