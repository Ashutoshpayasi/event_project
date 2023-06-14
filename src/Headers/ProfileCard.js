import { useNavigate } from "react-router";
import { useAppContext } from "../contexts/ContextProvider"
import { useState } from "react";
import Profile from "./Profile";


export default function ProfileCard({setCard , setProfileImage}) {
    const { userDetails, setUserDetails } = useAppContext();
    const navigate = useNavigate();
    const [uploadProfile , setUploadProfile] = useState('');
    function logout() {
        setUserDetails("");
        navigate('/')
    }

    return <div className="profileCard">
        <div className="card1">{userDetails.user.contact}</div>
        <div className="card1">{userDetails.user.email}</div>
        <div className="card1"
            onClick={() =>{
                setUploadProfile(true)
            }}
        >Change Profile Pic</div>
        <div className="card1"
            onClick={() => {
                logout()
            }}
        >LogOut</div>
        {uploadProfile ?  <Profile setProfileImage={setProfileImage} setCard={setCard} setUploadProfile={setUploadProfile} /> : ""}
    </div>
}