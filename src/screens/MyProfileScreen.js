import React, {useState,useEffect} from "react";
import { Text, StyleSheet, View,ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Dimensions } from "react-native";
import ScreenHeading from "../components/ScreenHeading";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyProfileScreen =()=>{
  const [fetchedUserData, setUserData]=useState([]);

  useEffect(() => {        
      AsyncStorage.getItem('userDataObject').then(userDataString => {
          if (userDataString) {
              const userData = JSON.parse(userDataString);
              // console.log('User data == ',userData[0]);
              setUserData(userData[0]);
          
          } else { 
              // console.log('No User data found in storage.');
          }
      }).catch(error => {
          // console.log('Error retrieving  User data: ',error);
      });
  },[]);
//console.log('Userdata are ',fetchedUserData.status);
  if (fetchedUserData.status == 1){
    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.coverImage} />
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri:fetchedUserData.photo
                  }
                    //require('../components/kiut_logo.png')
                  }
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{fetchedUserData.first_name} {fetchedUserData.middle_name} {fetchedUserData.last_name}</Text>
                <Text style={styles.userBio}>{fetchedUserData.reg_no}</Text>
                <Text style={styles.userBio}>{fetchedUserData.programme}</Text>
                <Text style={styles.userBio}>{fetchedUserData.combination}</Text>
              </View>
              <View style={styles.otherDetailsConainer}>
                <Text>Gender</Text><Text>{fetchedUserData.gender}</Text>
              </View>
              <View style={styles.otherDetailsConainer}>
                <Text>Birth Date</Text><Text>{fetchedUserData.birthdate}</Text>
              </View>
              <View style={styles.otherDetailsConainer}>
                <Text>Marital Status</Text><Text>{fetchedUserData.marital_status}</Text>
              </View>
              <View style={styles.otherDetailsConainer}>
                <Text>Nationality</Text><Text>{fetchedUserData.nationality}</Text>
              </View>
              <View style={styles.otherDetailsConainer}>
                <Text>NIN</Text><Text>{fetchedUserData.nin}</Text>
              </View>
              </View>
            </View>
            <View style={styles.contactsContainer}>
                <View style={styles.otherDetailsConainer}>
                    <Text>Address</Text><Text>{fetchedUserData.addess}</Text>
                </View>
                <View style={styles.otherDetailsConainer}>
                    <Text>Phones</Text><Text>{fetchedUserData.phones}</Text>
                </View>
                <View style={styles.otherDetailsConainer}>
                    <Text>Email</Text><Text>{fetchedUserData.email}</Text>
                </View>
            </View>
        </ScrollView>    
    </View>;
  }
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:"lighgrey",
        flex:1
    },
    coverImage: { 
        height: 200, 
        width: '100%',
        backgroundColor:'#023576',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    profileContainer: {
      // height: 1000,
      backgroundColor: '#fff',
      marginTop: -100,
      marginHorizontal:20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom:5      
    },
    contactsContainer: {
      // height: 1000,
      backgroundColor: '#fff',
      marginHorizontal:20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopWidth:1,
      borderTopColor:'lightgrey',
      paddingBottom:10,
      marginBottom: 10
    },
    profileImageView: { alignItems: 'center', marginTop: -50},
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: '#fff',
    },
    nameAndBioView: { alignItems: 'center', marginTop: 10 },
    userFullName: { fontSize: 26 },
    userBio: {
      fontSize: 18,
      color: '#333',
      marginTop: 4,
    },
    otherDetailsConainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:15,
        marginTop:12,
        fontSize:15
    }
});

export default MyProfileScreen;