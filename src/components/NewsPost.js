import React from "react";
import { Text, View, StyleSheet } from "react-native";

const NewsPost =({postData})=>{
    return <View style={styles.postItem}>
            <Text style={styles.postTitle}>{postData.postTitle}</Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.postDate}>{postData.postDate}</Text>
            <Text style={styles.postDate}>{postData.post_by}</Text>
        </View>
        
        <Text style={styles.postContents}>{postData.postContents}</Text>
        
    </View>
};

const styles=StyleSheet.create({
    postItem:{
        marginTop:5,
        marginHorizontal:5,
        padding:10,
        borderWidth:1,
        backgroundColor:'#fff',
        borderColor:'white',
        borderRadius:6,
        elevation: 3,
        borderBottomColor:'lightgrey'
    },
    postTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#023576'
    },
    postDate:{
        fontSize:12,
        color:'grey',
        paddingVertical:5
    },
    postContents:{
        borderTopWidth:0.2,
        borderTopColor:'lightgrey',
        paddingVertical:8,
        color:'#000'
    }
});

export default NewsPost;