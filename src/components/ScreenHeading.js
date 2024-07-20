import React from "react";
import { Text, StyleSheet } from "react-native";

const ScreenHeading=({heading})=>{
return <Text style={theStyles.headingStyle}>{heading}</Text>
};

const theStyles=StyleSheet.create({
    headingStyle:{
        color:'#023576',
        marginVertical:5,
        marginHorizontal:5,
        padding:5,
        borderBottomWidth:1,
        borderColor:'#CDC5BF',
        fontSize:16,
        fontWeight:'bold'
    }
});

export default ScreenHeading;