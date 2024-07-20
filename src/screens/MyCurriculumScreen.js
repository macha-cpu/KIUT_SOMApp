import React from "react";
import { Text,View,StyleSheet } from "react-native";
import ScreenHeading from "../components/ScreenHeading";

const MyCurriculumScreen=()=>{
    return <View>
        <ScreenHeading heading="View My curriculum"/>
    </View>;
};

const styles=StyleSheet.create({
    backgroundColor:'lighgrey'
});

export default MyCurriculumScreen;