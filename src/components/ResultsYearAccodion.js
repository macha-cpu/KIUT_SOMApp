import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager,FlatList} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ResultsSemesterAccodion from './ResultsSemesterAccodion ';

export default class ResultsYearAccodion extends Component{
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
                <Text style={[styles.title, styles.font]}>{this.props.data.acadYrTitle}</Text>
                <Icon 
                    name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} 
                    color="#fff" 
                />
            </TouchableOpacity>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <FlatList 
                        data={this.props.data.semesters}
                        renderItem={({item})=>{
                            return <ResultsSemesterAccodion data={item}/>
                        }}
                    />
                <View>
                <View style={styles.annualresultItems}>
                    <View style={styles.annualresultItem}><Text>Annual GPA</Text></View>
                    <View style={styles.annualresultItem}><Text>{this.props.data.annualGPA}</Text></View>
                </View>
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
        fontSize: 18,
        fontWeight:'bold',
        color: '#fff',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:20,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: '#023576',
        borderTopWidth:0.2,
        borderColor:'lighgrey',
    },
    child:{
        backgroundColor: 'lighgrey',
        paddingVertical:10,
        paddingHorizontal:2,
        borderBottomWidth:0.2,
    },
    annualresultItems:{
        flex: 1,
        flexDirection: 'row',
        textAlign:'center',
        color:'#fff',
    },
    annualresultItem:{
        flex: 2,
        padding:5,
        backgroundColor:'lightblue',
        fontWeight:'bold'
    }
    
});