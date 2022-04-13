import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        paddingTop: '15%',
        flex: 1,
        alignContent: 'center',
        backgroundColor: 'ghostwhite',
    },
    closeModalButton: {
        marginTop: '15%',
        marginRight: '3%',
        alignSelf: 'flex-end'
    },
    postForm: {
        paddingLeft: '10%',
        marginTop: '5%',
        display: 'flex',
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    textInput: {
        width: '85%',
        height: 40,
        marginTop: '2%',
        // marginLeft: '-6%',
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    submitButtons: {
        paddingLeft: '10%',
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between'
    },
    button: {
        marginTop: '25%',
        alignSelf: 'center',
        width: '45%',
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 15,
    }
});

export {styles}