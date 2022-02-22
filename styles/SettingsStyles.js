import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DADADA'
    },
    inner: {
        paddingTop: '10%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'ghostwhite',
    },
    buttons:{
        height: '35%',
        justifyContent: 'space-between'
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        paddingLeft: '20%',
        paddingRight: '20%',
        borderWidth: 1,
        borderColor: "#A7A7A7",
        borderRadius: 10,
        height: 40,
        width: '75%'
    },
    buttonText:{
        color: "#555555",
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        marginBottom: 6
    }
});

export {styles}