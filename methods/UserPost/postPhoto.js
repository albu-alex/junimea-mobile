import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { Alert } from 'react-native'

export async function postPhoto() {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
        return;
    }
    let localUri = pickerResult.uri;
    let filename = localUri.split('/').pop();
    let newUri;
    let data = new FormData();
    data.append('File', {uri: localUri, name: filename});
    await axios.post('http://52.57.118.176/File/Add', data, {
        timeout: 4000,
        headers: { "Content-Type": "multipart/form-data" }
    })
    .then(function (response){
        if(response.status === 200){
            newUri = response.data.url
            let newImage = {
                uri: newUri,
                height: pickerResult.height,
                width: pickerResult.width
            }
            Alert.alert("Success", "Image added successfully",
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
            return newImage
        }
    })
    .catch(function(){
        Alert.alert("Oops", "Something went wrong",
            [
                {
                    text: "Try again",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    });
}