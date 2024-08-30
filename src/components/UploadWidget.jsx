import {useEffect, useRef, useState} from 'react';

export default function UploadWidget() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [profilePic, setProfilePic] = useState('');

    const imgStyle = {
        width: '100px',
        height: '150px',
        borderRadius: '50%',
        position: 'relative',
        left : '37.5%',
    };

    const buttonStyle = {
        position: 'absolute',
        top: '105%',
        color: 'blue',
        border: 'none',
        backgroundColor: 'transparent',
        textDecoration: 'underline',
    }

    useEffect(() => {
                cloudinaryRef.current  = window.cloudinary;
               widgetRef.current = cloudinaryRef.current.createUploadWidget({
                    cloudName: 'dwfvmcziw',
                    uploadPreset: 'bravissimo'
                }, function(error, result) {
                    if (!error && result && result.event === "success") {
                        console.log('Done! Here is the image info: ', result.info);
                        setProfilePic(result.info.secure_url);
                    }
                    });
                }, [])
    return (
        <>
        <button style={buttonStyle} onClick={() => widgetRef.current.open()}>
            Upload Profile Picture
        </button>
        <div>
        {profilePic && <img src={profilePic} alt="Profile" style={imgStyle}/>}
        </div>
        </>
    )
            }