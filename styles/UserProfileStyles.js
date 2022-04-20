import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '15%'
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    profilePicture:{
        width: 75,
        height: 75,
        borderRadius: 50,
        alignSelf: 'center'
    },
    primaryText:{
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '5%',
        fontSize: 20,
        fontWeight: '500'
    },
    profileButton:{
        alignSelf: 'center',
        borderRadius: 10,
        width: "40%",
        height: "50%",
        margin: "5%"
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '400',
        margin: "5%"
    }
})

export {styles}