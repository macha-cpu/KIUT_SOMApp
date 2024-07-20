import React, {useState, useEffect} from "react";
import { Text,StyleSheet,View, FlatList } from 'react-native';
import ScreenHeading from "../components/ScreenHeading";
import ResultsYearAccodion from "../components/ResultsYearAccodion";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from "react-native-reanimated";

const MyProgressScreen=()=>{
    const [fetchedResults, setData]=useState([]);
    useEffect(() => {
        AsyncStorage.getItem('resultsObject').then(jsonResultsString => {
            if (jsonResultsString) {
                const results = JSON.parse(jsonResultsString);
                setData(results);
                //console.log('Retrieved JSON object:', invoices);
            } else { 
                return <Text>No Results found.</Text>;
            }
        }).catch(error => {
            return <Text>Error retrieving Results: '{error}</Text>;
        });
    },[]);
    var overallGPA= '-';
    var overallGPAclassification="";
    if (fetchedResults.length > 0){
        var overallGPA= fetchedResults[0]['overallGPA'];
        var overallGPAclassification=fetchedResults[0]['overallGPAclassification'];
    }
//console.log('Retrieved results object:', fetchedResults);
//return;
    return <View style={styles.container}>
        <FlatList 
            data={fetchedResults}
            renderItem={({item})=>{
                return <ResultsYearAccodion data={item}/>
            }}
        />
        
        <View style={{}}>
            <View style={styles.overalresultItems}>
                <View style={styles.overalresultItemHead}><Text>Overall GPA</Text></View>
                <View style={styles.overalresultItemHead}><Text>Classification</Text></View>
            </View>
            <View style={styles.overalresultItems}>
                <View style={styles.overalresultItem}><Text>{overallGPA}</Text></View>
                <View style={styles.overalresultItem}><Text>{overallGPAclassification}</Text></View>
            </View>
        </View>
    </View>;
};

const styles= StyleSheet.create({
    container:{
        backgroundColor:"#F5F5F5",
        flex:1,
        paddingTop:2
    },
    overalresultItems:{
        flex: 1,
        flexDirection: 'row',
        textAlign:'center'
    },
    overalresultItemHead:{
        flex: 1,
        padding:5,
        backgroundColor:'#fff'
    },
    overalresultItem:{
        flex: 1,
        padding:5,
        backgroundColor:'#fff',
    }
});

export default MyProgressScreen;