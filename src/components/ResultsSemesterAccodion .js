import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, FlatList} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ResultsCoursesAccodion from './ResultsCoursesAccodion';

export default class ResultsSemesterAccodion extends Component{
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
                <Text style={[styles.title, styles.font]}>{this.props.data.semesterTitle}</Text>
                <Icon 
                    name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} 
                    color="#000" 
                />
            </TouchableOpacity>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <FlatList 
                        data={this.props.data.courses}
                        renderItem={({item})=>{
                            return <ResultsCoursesAccodion data={item}/>
                        }}
                    />
                <View style={styles.semesterresultItems}>
                    <View style={styles.semesterresultItem}><Text>Semester GPA</Text></View>
                    <View style={styles.semesterresultItem}><Text>{this.props.data.semesterGPA}</Text></View>
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
        fontSize: 16,
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
        paddingVertical:10,
        paddingHorizontal:6,
        borderBottomWidth:0.2,
    },
    semesterresultItems:{
        flex: 1,
        flexDirection: 'row',
        textAlign:'center',
        color:'#fff',
    },
    semesterresultItem:{
        flex: 2,
        padding:5,
        backgroundColor:'lightgrey',
        fontWeight:'bold'
    }
    
});