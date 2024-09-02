import { useEffect, useRef, useState } from 'react';

export default function UploadWidget(props) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    // const [profilePic, setProfilePic] = useState('');

    const buttonStyle = {
        // position: 'absolute',
        // top: '105%',
        // marginTop: '20px',
        color: 'blue',
        border: 'none',
        backgroundColor: 'transparent',
        textDecoration: 'underline',
    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dwfvmcziw',
            uploadPreset: 'bravissimo',
            styles: {
                palette: {
                    window: "#9DBC98"
                    // windowBorder: "#9DBC98",
                    // textDark: "#4D4D4D",
                    // textLight: "#F0F0F0",
                    // menuIcons: "#4D4D4D",
                },
            }
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                document.getElementById('profileImgContainer').style.display = 'block';
                console.log('Done! Here is the image info: ', result.info);
                // setProfilePic(result.info.secure_url);
                props.setProfileImg(result.info.secure_url);
            }
        });
    }, [])
    return (
        <>
            <button type="button" style={buttonStyle} onClick={() => widgetRef.current.open()}>
                Upload Profile Picture
            </button>
        </>
    )
}