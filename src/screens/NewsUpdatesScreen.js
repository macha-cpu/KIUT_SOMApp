import React, {useState, useEffect} from "react";
import { Text,StyleSheet,FlatList,View } from "react-native";
import ScreenHeading from "../components/ScreenHeading";
import NewsPost from "../components/NewsPost";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import kiut from "../api/kiut";
const NewsUpdateScreen=()=>{
    const [fetchedNews, setData]=useState([]);
    const [isConnected, setIsConnected] = useState(false); 
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        // Cleanup the subscription when component unmounts
        return () => {
            unsubscribe();
        };
    }, []);
    
    const loadRemotePostsdata= ()=>{
        useEffect(() => {
            if (isConnected){
                console.log('Connnected --- ');
                try{
                    kiut.get('get_posts.php',{
                        params:{
                            'reg_no': 'T'
                        }
                    }).then(invresults =>{
                        //console.log('Posts data ',invresults.data);
                        //setInvoicesData(invresults.data);
                        const jsonResults = JSON.stringify(invresults.data);
                        AsyncStorage.setItem('newsObject', jsonResults).then(() => {
                            console.log('Posts to store.',invresults.data);
                            const news = JSON.parse(jsonResults);
                            setData(news);
                            console.log('Posts to view.',news);
                        }).catch(error => {
                            console.log('Error storing Posts:', error);
                        }); 
                    })
                }catch(error){
                    console.log('Failed to load Posts: ');
                };
            }else{
                 console.log('No internet ---');
                // useEffect(() => {
                    AsyncStorage.getItem('newsObject').then(jsonNewsString => {
                        if (jsonNewsString) {
                            const news = JSON.parse(jsonNewsString);
                            setData(news);
                            //console.log('Retrieved JSON object:', invoices);
                        } else { 
                            return <Text>No JSON object found in storage.</Text>;
                        }
                    }).catch(error => {
                        return <Text>Error retrieving JSON object: '{error}</Text>;
                    });
                // },[]);
            }
        },[isConnected]);
      };
      loadRemotePostsdata();


//console.log('News ',fetchedNews);
//return;
return (<View style={theStyles.container}>
    <FlatList
        data={fetchedNews}
        keyExtractor={(fetchedNews)=>fetchedNews.postId}
        renderItem={({item})=>{
            return <NewsPost postData={item}/>
        }}
    />
</View>   
);

};

const theStyles=StyleSheet.create({
    container:{
        backgroundColor:"#F5F5F5",
        flex:1
    },
});

export default NewsUpdateScreen;
