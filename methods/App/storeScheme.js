import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeScheme(scheme) {
    const setScheme = async () => {
        try{
            let jsonValue = JSON.stringify(scheme)
            await AsyncStorage.setItem('scheme', jsonValue)
        } catch{
            alert("There was an error storing the values!")
        }
    }
    await setScheme()
}