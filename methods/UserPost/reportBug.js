import { Alert, Platform } from 'react-native'

export function reportBug(postHidden){
    if(postHidden) {
        Alert.alert("", "",
            [
                {
                    text: "Report post",
                    style: "cancel",
                    onPress: () => alert("report post")
                },
                {
                    text: "Report bug",
                    style: "cancel",
                    onPress: () => alert("report bug")
                },
                {
                    text: "Hide post",
                    style: "cancel",
                    onPress: () => alert("hide post")
                },
                {
                    text: "Save post",
                    style: "cancel",
                    onPress: () => alert("save post")
                }
            ]
        );
        return true;
    }
    Alert.alert("", "",
        [
            {
                text: "Report post",
                style: "cancel",
                onPress: () => alert("report post")
            },
            {
                text: "Report bug",
                style: "cancel",
                onPress: () => alert("report bug")
            },
            {
                text: "Show post",
                style: "cancel",
                onPress: () => alert("show post")
            },
            {
                text: "Save post",
                style: "cancel",
                onPress: () => alert("save post")
            }
        ]
    );
    return false;
}