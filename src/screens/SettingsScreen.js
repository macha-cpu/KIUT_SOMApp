import React,{useState} from "react";
import { Text,View,StyleSheet, TouchableOpacity } from "react-native";
import ScreenHeading from "../components/ScreenHeading";
import { Switch } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const SettingsScreen=()=>{
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    
    const doLogout=()=>{
        removeUserData('userDataObject');
        removeUserData('resultsObject');
        removeUserData('invoicesObject');
        RNRestart.Restart();
    }

    const removeUserData = async (key) => {
        try {
          await AsyncStorage.removeItem(key);
          console.log(`Item with key ${key} has been removed.`);
        } catch (error) {
          console.error(`Error removing item: ${error}`);
        }
      };

    return(<View style={styles.container}>
        <View style={styles.settingsOptions}>
            <Text style={{fontSize:18}}>Push Notification</Text>
            <Switch 
                trackColor={{false: '#767577', true: '#023576'}}
                thumbColor={isEnabled ? '#023576' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
        <View style={styles.aboutContainer}>
            <Text style={{fontSize:20,marginBottom:5}}>KIUT_SOMApp</Text>
            <Text style={{marginBottom:5}}>Version 1.0.0</Text>
            <Text>2023</Text>
        </View>
        <View style={styles.creditsContainer}>
            <Text style={{fontSize:17,marginBottom:5}}>Credits</Text>
            <Text style={{marginBottom:5}}>Joely Elibariki Macha</Text>
            
            <TouchableOpacity style={{marginTop:5}} onPress={doLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
        
    </View>        
    );
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#F5F5F5",
        flex:1,
        paddingTop:15
    },
    settingsOptions:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:15,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey',
        paddingBottom:6
    },
    aboutContainer:{
        marginTop:'40%',
        alignSelf: 'center',
        textAlign:'center'
    },
    creditsContainer:{
        textAlign:'center',
        alignSelf: 'center',
        position:'absolute',
        bottom:35
    }
});

export default SettingsScreen;