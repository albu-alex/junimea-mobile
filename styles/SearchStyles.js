import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        paddingTop: '15%',
        flex: 1,
    },
    header:{
        marginTop: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText:{
        fontSize: 20,
        fontWeight: '500',
        marginTop: '10%',
        marginRight: '3%',
        marginLeft: '6%',
        color: "#e34234"
    },
    primaryText:{
        fontSize: 24,
        fontWeight: "700",
        marginLeft: "2%",
        marginTop: "10%"
    },
    tags:{
        fontSize: 20,
        fontWeight: "400",
        marginLeft: "5%",
        marginTop: "2%"
    },
    textInput:{
        width: "75%",
        height: "100%",
        marginBottom: "5%",
        marginLeft: "-6%",
        paddingTop: 10,
        borderRadius: 10,
        paddingLeft: 25,
        paddingRight: 25,
    },
    searchIcon:{
        zIndex: 2,
        paddingTop: 10,
        paddingLeft: 15,
        marginLeft: "2%"
    }
});

export {styles}