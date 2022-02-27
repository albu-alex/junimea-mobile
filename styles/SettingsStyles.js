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
        backgroundColor: '#DADADA',
    },
    buttons:{
        height: '35%',
        justifyContent: 'space-between'
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        backgroundColor: 'ghostwhite',
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
    },
    icon:{
        marginTop: 3,
        marginRight: '3%',
        marginLeft: '30%'
    },
    closeModalButton:{
        marginTop: '15%',
        marginRight: '3%',
        alignSelf: 'flex-end'
    },
    inputsContainer:{
        alignSelf: 'center',
        marginTop: '20%'
    },
    modalIcon:{
        marginTop: '5%',
        marginLeft: '10%',
        zIndex: 2
    },
    textInput:{
        backgroundColor: '#AFAFAF',
        width: '85%',
        height: 40,
        marginTop: '2%',
        marginLeft: '-6%',
        color: "#969696",
        borderRadius: 15,
        paddingHorizontal: 25,
    },
});

export {styles}