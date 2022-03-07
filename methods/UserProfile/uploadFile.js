import * as ImagePicker from 'expo-image-picker';

//This function is used in order to upload the photo which the user has selected for profile picture
export async function uploadFile(){
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
        return
    }
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = pickerResult.uri
    let filename = localUri.split('/').pop()
    return {localUri, filename}
}