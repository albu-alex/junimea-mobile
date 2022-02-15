import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DADADA'
    },
    inner: {
        paddingTop: '15%',
        flex: 1,
        backgroundColor: "#DADADA"
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
        color: "#555555",
        fontSize: 24,
        fontWeight: "700",
        marginLeft: "2%",
        marginTop: "10%"
    },
    tags:{
        color: "#555555",
        fontSize: 20,
        fontWeight: "400",
        marginLeft: "5%",
        marginTop: "2%"
    },
    textInput:{
        backgroundColor: "#AFAFAF",
        width: "75%",
        height: "100%",
        marginBottom: "5%",
        marginLeft: "-6%",
        color: "#070700",
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