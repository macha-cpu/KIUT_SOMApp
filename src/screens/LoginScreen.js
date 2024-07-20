import React, {useState,useEffect} from "react";
import { Text , StyleSheet, View, SafeAreaView,TextInput, Button, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import kiut from '../api/kiut';
import HomeScreen from "./HomeScreen";

const LoginScreen=({navigation})=>{
    const[userName, setUsername]= useState('');
    const [passWord, setPassword]= useState('');
    
    const login=(cred)=>{
        kiut.get('user_auth.php',{
            params:{
              'reg_no':cred.userName,
              'password':cred.passWord,
            }
         }).then(authData =>{
            console.log(' API data',authData.data);
            navigation('HomeScreen');
            if (authData.data.status == 1){
                
            }else{

            }
          }).catch(error=>{
            setErrorMessage1('Failed to load Invoices: ');
          });
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.loginForm}>
                <View style={styles.loginImageContainer}>
                    <Image source={require('../components/KIUTLOGO.png')} style={styles.loginImage} resizeMode="center" />
                </View>
                <View>
                    <TextInput 
                        style={styles.loginInputs} 
                        autoCapitalize="characters" 
                        placeholder="Username" 
                        onChangeText={setUsername}
                     />
                    <TextInput 
                    style={styles.loginInputs} 
                    placeholder="Password" 
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    />
                    <Button title="Login" onPress={()=> login({userName,passWord})} />
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles=StyleSheet.create({
    container:{
        backgroundColor:"#F5F5F5",
        flex:1
    },
    loginForm:{
        height:420,
        marginTop:150,
        marginHorizontal:5,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingTop:30,
        borderRadius:20,
        borderWidth:1,
        borderColor:"#EFEFEF"
    },
    loginInputs:{
        borderWidth:1,
        padding:10,
        marginBottom:10,
        borderColor:"#D0D0D0",
        borderRadius:5
    },
    loginImageContainer:{
        alignItems:"center",
        marginBottom:15
    },
    loginImage:{
        width:130,
        height:130,
        
    }
});
export default LoginScreen;