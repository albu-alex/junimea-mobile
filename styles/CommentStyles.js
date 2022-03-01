import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEAEA',
        flex: 1,
        paddingHorizontal: "2%",
        paddingTop: "2%"
    },
    headerText:{
        color: "#555555",
        fontSize: 18,
        fontWeight: "500",
        marginBottom: "3%",
    },
    header:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        display: 'flex'
    },
    primaryText:{
        color: "#555555",
        fontSize: 16,
        fontWeight: "400",
        marginBottom: "2%",
        marginLeft: "4%"
    }
})

export {styles}