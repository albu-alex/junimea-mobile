import { Alert } from 'react-native'
import { setHiddenPosts } from "./setHiddenPosts";
import { setSavedPosts } from "./setSavedPosts";

export function reportBug(postHidden, post){
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
                    onPress: () => setHiddenPosts(post)
                },
                {
                    text: "Save post",
                    style: "cancel",
                    onPress: () => setSavedPosts(post)
                }
            ]
        );
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
}