import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';

export default function UpdateInformation(props) {

    const [userInfo, setUserInfo] = useState({
        name: props.user.name,
        email: props.user.email,
        postalCode: props.user.postalCode,
        phoneNumber: props.user.phoneNumber,
        error:""
    })

    const handleChange = (evt) => {
          setUserInfo({ ...userInfo, [evt.target.name]: evt.target.value });
    };


    const handleSubmit = async(evt) => {
        evt.preventDefault()

            try {
            let jwt = localStorage.getItem("token");
            const fetchResponse = await fetch(`/api/users/${props.user._id}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", 
                Authorization: "Bearer " + jwt },
                body: JSON.stringify({
                name: userInfo.name,
                email: userInfo.email,
                phoneNumber: userInfo.phoneNumber,
                postalCode: userInfo.postalCode,
                }),
            });

            if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

            if (fetchResponse.ok) {
                console.log(fetchResponse)
                props.closeModal()
            }

            setUserInfo({
                name: "",
                email: "",
                phoneNumber: "",
                postalCode: "",
                error: ""
            });

            props.setUpdatedAccount(true)
            
            } catch (err) {
            console.log("UpdateFormError", err.message);
            setUserInfo({ error: "Update Failed - Try Again" });
            }
        }
        
    console.log(props.user)
    return (
        <div>
            <Modal.Header closeButton>Update Information</Modal.Header>
            <Modal.Body>
            <UpdateUserInfoForm userInfo={userInfo} setUserInfo={setUserInfo} handleChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" variant="primary" onClick={(e) => handleSubmit(e)} >
                Submit Account Info
            </Button>
            </Modal.Footer>

        </div>
    )
}
