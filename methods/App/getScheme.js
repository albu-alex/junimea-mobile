import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getScheme() {
    const retrieveScheme = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('scheme')
            return JSON.parse(jsonValue) !== null ? JSON.parse(jsonValue) : null
        } catch {
            alert("Error while reading local storage")
        }
    }
    return await retrieveScheme()
}