import React, { useState } from 'react'
import Preview from './Preview'
import close from '.././Images/close.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfilePic } from '../utils/utils.api'
import { useAppContext } from '../contexts/ContextProvider'
function Profile({ setUploadProfile , setCard , setProfileImage}) {
    const [data, setData] = useState("");
    const { userDetails, userType ,setUserDetails} = useAppContext()
    function setProfile(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profilePic", data);
        updateProfilePic(formData, userType, userDetails.user._id).then(res => {
            if(res.status === "Success"){
                setProfileImage(res.data.profile_pic)
                setUploadProfile(false);
                setCard(false)
                toast.success("Profile Updated successfully" , {
                    position : 'top-right'
                })
            }else{
                toast.error(res.message , {
                    position: 'top-right'
                })
            }
        })
    }
    return (
        <div className='ProfileCard'>
            <form onSubmit={setProfile} encType="multipart/form-data">
                <div className='inputContainer'>
                    <div className='titleContainer'>
                        <label>Profile Picture</label>
                        <img src={close} alt='Close Icon'
                            onClick={() => setUploadProfile(false)}
                        />
                    </div>
                    <input type='file' filename="profile_pic" onChange={(e) => {
                        setData(e.target.files[0])
                    }}
                    />
                    <div>
                        {
                            data ? <Preview post={URL.createObjectURL(data)} /> : ""
                        }
                        {
                            data ? <button type='submit'>Add</button> : ""
                        }
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>

    )
}

export default Profile