import React from "react";
import axios from 'axios'
import { Alert } from 'react-native'

export async function uploadProfilePicture(profilePicture) {
    const data = new FormData()
    data.append("Pic", profilePicture)
    await axios.post('http://52.57.118.176/User/ProfilePic', data, {
        timeout: 4000
    })
    .then(function (response){
        if(response.status === 200){
            Alert.alert("Success", "Profile picture updated successfully!",
                [
                    {
                        text: "Great",
                        style: "cancel",
                    }
                ],
                {
                    cancelable: true,
                }
            );
        }
    })
    .catch(function (error){
        if(error.response){
            Alert.alert("Error", String(Object.values(error.response.data.errors)[0]),
                [
                    {
                        text: "Try again",
                        style: "cancel",
                    }
                ],
                {
                    cancelable: true,
                }
            );
        }
    });
}