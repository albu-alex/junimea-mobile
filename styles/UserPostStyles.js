import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: '2%',
        marginBottom: '5%',
        backgroundColor: '#EAEAEA'
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '2%'
    },
    headerText: {
        color: '#555555',
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: '3%'
    },
    contentHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primaryText:{
        color: "#555555",
        fontSize: 24,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: '2%',
        marginBottom: '2%'
    },
    tags:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    feedback:{
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: '2%',
        marginBottom: '1%'
    },
    logo:{
        marginLeft: '5%',
        marginRight: '5%',
    },
    likeCount:{
        color: "#555555",
        fontSize: 24,
        fontWeight: '500',
        marginLeft: '7%',
        marginRight: '15%'
    }
});

export {styles}