import * as ImagePicker from 'expo-image-picker'
import { uploadProfilePicture } from "./uploadProfilePicture";

//This function is used in order to upload the photo which the user has selected for profile picture
export async function uploadFile(){
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1
    });
    if (pickerResult.cancelled === true) {
        return
    }
    if (pickerResult) {
        uploadProfilePicture(pickerResult)
    }
}