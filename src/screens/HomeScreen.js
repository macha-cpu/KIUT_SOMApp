import React from 'react';
import {Text,StyleSheet,Button,View,Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NewsUpdateScreen from './NewsUpdatesScreen';
import MyProgressScreen from "./MyProgressScreen";
// import MyCurriculumScreen from "./MyCurriculumScreen";
import MyPaymentsScreen from './MyPaymentsScreen';
import MyProfileScreen from "./MyProfileScreen";
import SettingsScreen from "./SettingsScreen";
import LoginScreen from './LoginScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer =createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator
    initialRouteName="newsScreen" 
    screenOptions={({ route }) => ({

    })}
  >
    <Tab.Screen 
      name="newsScreen" 
      component={NewsUpdateScreen} 
      options={{title:'Home',headerShown: false,tabBarIcon:({color,size})=>(
        <Icon name="home" size={30} color={'#023576'}/>
      )}} 
    />
    <Tab.Screen 
      name="myProgressScreen" 
      component={MyProgressScreen} 
      options={{title:'My Progress',headerShown: false,tabBarIcon:({color,size})=>(
        <Icon name="show-chart" size={30} color={'#023576'}/>
      )}} 
    />
    <Tab.Screen 
      name="myPaymentsScreen" 
      component={MyPaymentsScreen} 
      options={{title:'My Payments',headerShown: false,tabBarIcon:({color,size})=>(
        <Icon name="payment" size={30} color={'#023576'}/>
      )}} 
    />
    <Tab.Screen 
      name="myProfileScreen" 
      component={MyProfileScreen} 
      options={{title:'Profile',headerShown: false,tabBarIcon:({color,size})=>(
        <Icon name="account-circle" size={30} color={'#023576'}/>
      )}} 
    />
  </Tab.Navigator>
);

const HomeScreen = ({navigation})=>{
    return (
        <NavigationContainer>
        <Drawer.Navigator 
        initialRouteName="tabNavigation"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#023576',
            borderBottomWidth:0
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerContentContainerStyle:{
            marginTop:5
          }
        }}
        >
          <Drawer.Screen name="tabNavigation" component={TabNavigation} options={{title:'KIUT_App'}} />
          <Drawer.Screen name="settingsScreen" component={SettingsScreen} options={{title:'Settings'}} />
        </Drawer.Navigator>
        
      </NavigationContainer>
        );
               // <Button title="News Posts" onPress={()=>navigation.navigate('newsScreen')} />
};

const styles=StyleSheet.create({
    navBtns:{
        width:100,
        backgroundColor:'grey'
    },
    welcomeMsg:{
        color:'green',
        marginVertical:10,
        marginHorizontal:5,
        padding:10,
        borderWidth:1,
        borderColor:'lightgrey'
    }
});

export default HomeScreen;