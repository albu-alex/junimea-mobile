import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "2%",
        paddingTop: "2%"
    },
    headerText:{
        fontSize: 18,
        fontWeight: "500",
        marginBottom: "3%",
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '2%',
        display: 'flex'
    },
    primaryText:{
        fontSize: 16,
        fontWeight: "400",
        marginBottom: "2%",
        marginLeft: "4%"
    },
    commentInteraction:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '10%',
        paddingRight: '50%',
        marginBottom: '4%'
    },
    secondaryText:{
        fontSize: 12,
        fontWeight: '600'
    }
})

export {styles}