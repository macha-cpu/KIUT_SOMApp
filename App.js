import 'react-native-gesture-handler';
import React, {useState, useEffect} from "react";
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from "./src/screens/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import kiut from './src/api/kiut';
import { View, Text, TouchableOpacity, TextInput,Button } from 'react-native';
import LoginModal from './src/screens/LoginModal';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';

const initializeApp = ()=>{
  const [isModalVisible, setModalVisible] = useState(true);
  const [fetchedUserData, setUserData]=useState([]);
  const [isConnected, setIsConnected] = useState(false);  
  const [errorMessage1,setErrorMessage1]=useState('');
  const [reloadFlag, setReloadFlag] = useState(false);

//   const handleReload = () => {
//     setReloadFlag(!reloadFlag);
//   };
//   return (
//     <View>
//       <Text>Hello, App {Math.random(4)}</Text>
//       <Button title="Reload" onPress={handleReload} />
//     </View>
//   );

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        // Cleanup the subscription when component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    
  const loadRemoteInvoicesdata= (regNo)=>{
    // useEffect(() => {
        if (isConnected){
            try{
                kiut.get('get_invoices.php',{
                params:{
                    'reg_no':regNo
                }
                }).then(invresults =>{
                //console.log('API data ',invresults.data);
                //setInvoicesData(invresults.data);
                const jsonInvoices = JSON.stringify(invresults.data);
                AsyncStorage.setItem('invoicesObject', jsonInvoices).then(() => {
                console.log('Invoices stored successfully.',invresults.data);
                }).catch(error => {
                // console.log('Error storing JSON object:', error);
                }); 
                })
            }catch(error){
                setErrorMessage1('Failed to load Invoices: ');
            };
        }else{
            console.log('No internet');
        }
    // },[]);
  };

  const loadRemoteResultsdata= (regNo)=>{
    // useEffect(() => {
        if (isConnected){
            try{
                kiut.get('get_results.php',{
                params:{
                    'reg_no':regNo
                }
                }).then(invresults =>{
                //console.log('Results data ',invresults.data);
                //setInvoicesData(invresults.data);
                const jsonResults = JSON.stringify(invresults.data);
                AsyncStorage.setItem('resultsObject', jsonResults).then(() => {
                console.log('Results stored successfully.',invresults.data);
                }).catch(error => {
                console.log('Error storing Results:', error);
                }); 
                })
            }catch(error){
                setErrorMessage1('Failed to load Invoices: ');
            };
        }else{
            console.log('No internet');
        }
    // },[]);
  };

  const loadRemotePostsdata= (regNo)=>{
    // useEffect(() => {
        if (isConnected){
            try{
                kiut.get('get_posts.php',{
                    params:{
                        'reg_no': regNo
                    }
                }).then(invresults =>{
                    //console.log('Posts data ',invresults.data);
                    //setInvoicesData(invresults.data);
                    const jsonResults = JSON.stringify(invresults.data);
                    AsyncStorage.setItem('newsObject', jsonResults).then(() => {
                        console.log('Posts stored successfully.',invresults.data);
                    }).catch(error => {
                        console.log('Error storing Posts:', error);
                    }); 
                })
            }catch(error){
                console.log('Failed to load Posts: ');
            };
        }else{
            console.log('No internet');
        }
    // },[]);
  };
    // loadRemotePostsdata();
    // loadRemoteResultsdata();
    // loadRemoteInvoicesdata();
    useEffect(() => {
        try{
            AsyncStorage.getItem('userDataObject').then(userDataString => {
                // console.log(userDataString);
                // return;
                if (userDataString && userDataString !='undefined') {
                    const userData = JSON.parse(userDataString);
                    // console.log('Reg No ',userData.length);
                   // console.log('User data == ',Object.keys(userData).length);
                    setUserData(userData);
                    if (userData.length > 0 && userData[0].reg_no != ''){
                        console.log('the connection ',isConnected);
                        //loadRemotePostsdata(userData[0].reg_no);
                        loadRemoteResultsdata(userData[0].reg_no);
                        loadRemoteInvoicesdata(userData[0].reg_no);
                    }
                } else {
                    console.log('No User data found in storage.');
                }
            })
        } catch(error){
            console.log('Error retrieving  User data: ',error);
        };
    },[isConnected]);

  const toggleModal = () => {
   // console.log('modal status is ',isModalVisible);
    setModalVisible(!isModalVisible);
    RNRestart.Restart();
  };

  console.log('Total data fetched is ',fetchedUserData.length);

    if (fetchedUserData.length == 0){
            return (
            <View>
                <LoginModal isVisible={isModalVisible} closeModal={toggleModal}/>
            </View>
            );
    }

  return(
    //<LoginScreen />
    <HomeScreen />
  );
};

export default initializeApp;