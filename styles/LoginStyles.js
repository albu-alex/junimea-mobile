import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        paddingTop: '10%',
        flex: 1,
        justifyContent: 'flex-start',
    },
    introText:{
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '10%',
        marginBottom: '5%'
    },
    textInput:{
        width: '90%',
        height: 40,
        marginBottom: '5%',
        marginLeft: '-6%',
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    loginButton:{
        backgroundColor: '#AFAFAF',
        margin: '5%',
        width: '90%',
        borderRadius: 10
    },
    buttonText:{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        marginTop: '1%',
        marginBottom: '1%'
    },
    secondaryText:{
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: "#555555",
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '5%'
    },
    logo:{
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').width/2,
        alignSelf: 'center',
        marginTop: '10%'
    },
    inputIcon:{
        zIndex: 2,
        marginLeft: '6%',
        marginTop: '1%'
    }
});

export {styles}