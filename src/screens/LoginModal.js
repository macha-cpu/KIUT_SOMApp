import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import Modal from 'react-native-modal';
import kiut from '../api/kiut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './HomeScreen';

const LoginModal = ({ isVisible, closeModal }) => {
    const[userName, setUsername]= useState('');
    const [passWord, setPassword]= useState('');
    const [authMsg, setauthMsg]= useState('');
  
    const submitLoginForm = () => {
      try{
        kiut.get('user_auth.php',{
            params:{
                'reg_no':userName,
                'password':passWord,
            }
        }).then(authData =>{
                
             //if (jsonUserData.status == 1){ 
                const jsonUserData = JSON.stringify(authData.data);
                AsyncStorage.setItem('userDataObject', jsonUserData).then(() => {
                 // console.log('User data stored successfully.', jsonUserData);
                }).catch(error => {
                  //console.log('Error storing user data:', error);
                }); 
                if (authData.data.length > 0){
                    console.log('API data ',authData.data[0].status);
                    closeModal();
                }else{
                    setauthMsg('Incorrect Credentials ');
                    console.log('Incorrect Credentials ');
                }
                 //closeModal();
            /// } else{

            // }
        })
        }catch(error){
            console.log('Failed authenticate: ');
        };        
    };
  
    return (
      <Modal isVisible={isVisible}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
            <View>
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
                    <Button title="Login" onPress={submitLoginForm} />
                </View>
            </View>
          <TouchableOpacity onPress={closeModal}>
            <Text>{authMsg}</Text>
          </TouchableOpacity>
          <Text></Text>
        </View>
      </Modal>
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
        borderRadius:10,
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
  export default LoginModal;