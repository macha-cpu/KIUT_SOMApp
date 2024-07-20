import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class ResultsCoursesAccodion extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          expanded : false,
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

  render() { 
    return (
       <View>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.data.courseTitle}</Text>
                <Icon 
                    name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} 
                    color="#000" 
                />
            </TouchableOpacity>
            {
                this.state.expanded && 
                <View style={styles.child}>
                    <View style={styles.resultItems}>
                        <View style={styles.resultItem}><Text>{this.props.data.courseCode}</Text></View>
                        <View style={styles.resultItem}><Text>CW: {this.props.data.CW}</Text></View>
                        <View style={styles.resultItem}><Text>SE: {this.props.data.SE}</Text></View>
                        <View style={styles.resultItem}><Text>Grade: {this.props.data.grade}</Text></View>
                    </View>
                    <View style={styles.resultItems}>
                        <View style={styles.resultItem}><Text>{this.props.data.courseStatus}</Text></View>
                        <View style={styles.resultItem}><Text>Credits: {this.props.data.credits}</Text></View>
                        <View style={styles.resultItem}><Text>Points: {this.props.data.points}</Text></View>
                        <View style={styles.resultItem}><Text>{this.props.data.remark}</Text></View>
                    </View>
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: '#000',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: '#fff',
        borderTopWidth:0.2,
        borderColor:'lighgrey' 
    },
    child:{
        backgroundColor: 'lighgrey',
        padding:10,
        borderBottomWidth:0.2,
    },
    resultItems:{
        flex: 1,
        flexDirection: 'row'
    },
    resultItem:{
        flex: 2,
        padding:5,
        borderWidth: 1,
        borderColor: 'lightgray'
    }
});