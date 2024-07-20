import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import NewsUpdateScreen from "./src/screens/NewsUpdatesScreen";

const Stack = createNativeStackNavigator();
const homeNavigation = ()=>{
return(
  <NavigationContainer>  
    <Stack.Navigator initialRouteName="myHome">
      <Stack.Screen name="myHome" component={HomeScreen} options={{title:'KIUT'}}/>
      <Stack.Screen name="newsScreen" component={NewsUpdateScreen} options={{title:'News Feeds'}}/>
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default homeNavigation;