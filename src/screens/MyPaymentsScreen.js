import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, FlatList} from "react-native";
import ScreenHeading from "../components/ScreenHeading";
import ProgressBar from 'react-native-progress/Bar';
import { round } from "react-native-reanimated";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPaymentsScreen=()=>{
    const [fetchedInvoices, setData]=useState([]);     
      useEffect(() => {
        AsyncStorage.getItem('invoicesObject').then(jsonString => {
            if (jsonString) {
                const invoices = JSON.parse(jsonString);
                setData(invoices);
                //console.log('Retrieved JSON object:', invoices);
            } else { 
                return <Text>No JSON object found in storage.</Text>;
            }
        }).catch(error => {
            return <Text>Error retrieving JSON object: '{error}</Text>;
        });
    },[]);
//    console.log('Retrieved invoices object:', fetchedInvoices);
//    return;
    return <View style={styles.container}>
        <FlatList 
            data={fetchedInvoices}
            renderItem={({item})=>{
                let pv=(item.totalPaid/item.invoicedAmount);
                return <View style={styles.invItem}>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center'}}>
                        <Text style={styles.invTitle}>{item.invoiceNo}</Text>
                        <Text style={styles.invYear}>{item.invoiceYear}</Text>
                    </View>
                <Text style={styles.invDescr}>{item.invoiceDescriptions} ({formatNumber(item.invoicedAmount)})</Text>
                <View style={styles.invContents}>
                    <Text style={{color:'green',fontWeight:'900'}}>{formatNumber(item.totalPaid)}</Text> 
                    <Text style={{color:'red',fontWeight:'900'}}>{formatNumber((item.invoicedAmount-item.totalPaid))}</Text>
                </View>
                <ProgressBar progress={pv} width={null} color={'#00357B'} />
            </View>
            }}
        />
    </View>;
};
const formatNumber=(num)=>{
    return num.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        });
}
const styles=StyleSheet.create({ 
    container:{
        backgroundColor:"#F5F5F5",
        flex:1
    },
    invItem:{
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
    invTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#023576'
    },
    invYear:{
        fontSize:14,
        color:'#023576'
    },
    invDescr:{
        paddingVertical:5,
        color:'#023576'
    },
    invContents:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth:0.2,
        borderTopColor:'lightgrey',
        paddingVertical:8
    }
});

export default MyPaymentsScreen;