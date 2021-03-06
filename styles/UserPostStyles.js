import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: '2%',
        marginBottom: '5%',
        display: "flex",
        flex: 1
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '2%'
    },
    headerText: {
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
    tag:{
      fontSize: 12,
      fontWeight: "400",
      alignSelf: "center"
    },
    tagBackground:{
      marginLeft: "2%",
      flexBasis: "33%",
      borderWidth: 1,
      borderRadius: 7,
      width: 100,
      marginBottom: 10
    },
    feedback:{
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: '4%',
        marginTop: '2%',
        marginBottom: '1%'
    },
    likeCount:{
        fontSize: 24,
        fontWeight: '500',
    },
    inputIcon:{
        zIndex: 2,
        marginLeft: '6%',
        marginTop: '3%'
    },
    textInput:{
        width: '70%',
        height: 25,
        marginTop: '2%',
        marginLeft: '-6%',
        borderRadius: 15,
        paddingHorizontal: 25,
    },
    addNewComment:{
        flexDirection: 'row',
        display: 'flex',
        marginBottom: '2%',
        borderTopWidth: 0.8
    },
    commentSection:{
        borderTopWidth: 0.8,
    },
    addNewCommentButton:{
        marginTop: '3%',
        marginLeft: '5%'
    },
    modal:{
        display: 'flex',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    modalButton:{
        marginRight: '4%',
        marginTop: '10%',
        backgroundColor: "#F0F0FF",
        borderRadius: 15,
        width: '20%',
        height: '3%',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    modalButtonText: {
        color: 'red',
        alignSelf: 'center',
    },
    noComment: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    }
});

export {styles}