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
        flex: 1,
        marginBottom: '3%'
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
    },
    inputIcon:{
        zIndex: 2,
        marginLeft: '6%',
        marginTop: '3%'
    },
    textInput:{
        backgroundColor: '#DADADA',
        width: '70%',
        height: 25,
        marginTop: '2%',
        marginLeft: '-6%',
        color: "#969696",
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    addNewComment:{
        flexDirection: 'row',
        display: 'flex',
        marginBottom: '2%',
        borderTopWidth: 0.8,
        borderTopColor: "#070700",
    },
    commentSection:{
        borderTopWidth: 0.8,
        borderTopColor: "#070700"
    },
    addNewCommentButton:{
        marginTop: '3%',
        marginLeft: '5%'
    }
});

export {styles}