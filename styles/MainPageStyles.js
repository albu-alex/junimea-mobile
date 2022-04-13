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
        marginTop: '5%',
        display: 'flex',
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
        alignContent: 'center'
    }
});

export {styles}