import React from "react";
import { Alert } from 'react-native'

export async function uploadProfilePicture(profilePicture) {
    const data = new FormData()
    data.append("Pic", profilePicture)
    await fetch('http://52.57.118.176/User/ProfilePic', {
        method: 'POST',
        headers: {
            'Content-Type' : 'multipart/form-data'
        },
        body: data
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
    })
}