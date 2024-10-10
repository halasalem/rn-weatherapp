import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,ImageBackground, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
//useLocalSearchParams helps us access data passed from the previous screen
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

 


export default function WeatherInfo() {

  const router=useRouter();
  const {weatherData}=useLocalSearchParams(); 
  // accessing the data and stroing it in weatherData
  // {} means you want to extract a property with that name from an object
  // without {} you would get the entire object instead of just the value of weatherData
  const parsedWeatherData=JSON.parse(weatherData); // converts weatherData back to a Javascript object

  const { name, main, weather, wind, clouds, sys } = parsedWeatherData; // destructing parsedWeatherData (we're pulling out specific pieces of info to use)
  const { temp, feels_like, humidity } = main;
  const weatherDescription = weather[0].description;
  const windSpeed = wind.speed;
  const cloudiness = clouds.all;
  const country = sys.country;

  const forecastData={
    city:name,
    country:country,
    current:{
      temperature:Math.round(temp-273.15),
      feels_like:Math.round(feels_like-273.15),
      weather:weatherDescription,
      humidity:humidity,
      cloudiness:cloudiness,
      windSpeed:windSpeed,
    }
  };

    return (

      

      <ImageBackground
      source={require('./../../../assets/images/weatherpic2.jpeg')}
      style={styles.container}
      resizeMode='cover'
      >

          <TouchableOpacity onPress={()=>router.back()} 
          style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

      
        <View style={{
          padding:15,
          marginBottom:100,
          marginLeft:20
          
          
        }}>
          <Text style={styles.title}>{name},{country}</Text>
          <Text style={{
            fontFamily:'rmedium',
            fontSize:60,
            color:'gray',
            textAlign:'center'
          }}> {Math.round(temp-273.15)}°</Text>


        </View>
        
      <View style={styles.boxContainer}>
        

        <View style={styles.box}>
          <FontAwesome6 style={styles.icon} name="temperature-half" size={24} color="white" />

          {/* feels like box */}

          <View style={{
            flexDirection:'column',
            alignItems:'flex-start'
          }}>
            <Text style={styles.text} >Feels like: </Text>
              <Text style={styles.number}>{Math.round(feels_like-273.15)}°</Text>
          </View>
        </View>

        {/* clouds box */}

        <View style={styles.box}>
          <Entypo style={styles.icon} name="cloud" size={25} color="white" />
          <View style={{
            flexDirection:'column',
            alignItems:'flex-start'

          }}>
            <Text style={{
              fontSize:18,
              fontFamily:'bold',
              color:'white',
              textAlign:'center',
              marginLeft:15,
              marginTop:10
      
            }}>Cloudiness: </Text>
            <Text style={{
              fontSize:15,
              color:'white',
              fontFamily:'medium',
              textAlign:'center',
              marginLeft:18
            }}>{weatherDescription}</Text>

            <Text style={{
              textAlign:'center',
              color:'white',
              fontFamily:'medium',
              fontSize:18,
              marginLeft:15
            }}> {cloudiness}%</Text>
          </View>
        </View>

        {/* humidity box */}

        <View style={styles.box}>
          <FontAwesome6 style={styles.icon} name="droplet" size={24} color="white" />
          <View style={{
            flexDirection:'column',
            alignItems:'flex-start'
          }}>
            <Text style={styles.text}>Humidity:</Text>
            <Text style={styles.number}>{humidity}%</Text>

          </View>
        </View>

        {/* wind speed box */}

        <View style={styles.box}>
          <FontAwesome5 style={styles.icon} name="wind" size={25} color="white" />
          <View style={{
            flexDirection:'column',
            alignItems:'flex-start'
          }}>
            <Text style={{
              fontFamily:'bold',
              fontSize:16.7,
              color:'white',
              marginLeft:18
            }}>Wind Speed: </Text>
            <Text style={{
              fontFamily:'medium',
              fontSize:20,
              color:'white',
              marginLeft:22
            }}>{windSpeed} m/s</Text>
            


          </View>
        </View>
      </View>
      

        
        
        

        

            

            <TouchableOpacity
            onPress={()=>router.push({
              pathname:'/auth/fiveDay-forecast',
              params:{city:name}
            })}
            style={{
              backgroundColor:'white',
              borderRadius:40,
              marginTop:70,
              padding:20,
              borderColor:'gray',
              borderWidth:3
            }}
            >
              <Text style={{
                color:'black',
                fontFamily:'bold',
                
              }}>Check 5-Day Forecast </Text>
            </TouchableOpacity>
            {/* </View> */}
        </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'white',
        //height:'100%',
        //paddingTop:30
        padding:20
    },
    title: {
        fontFamily:'rregular',
        color:'gray',
        fontSize:35,
        marginTop:20,
        textAlign:'center'
    },
    content:{
      alignItems:'center',
      width:'100%',
      marginTop:60

    },
    backButton:{
      position:'absolute',
      top:40,
      left:20,
      zIndex:1
    },
    info:{
      fontFamily:'medium',
      color:'white',
      fontSize:20


    },
    box:{
      backgroundColor:'#778b99',
      borderColor:'white',
      borderWidth:2,
      height:100,
      width:'45%',
      borderRadius:35,
      flexDirection:'row',
      alignItems:'center',
      padding:15,
      marginBottom:20
    },
    text:{
      textAlign:'center',
      marginLeft:30,
      fontFamily:'bold',
      color:'white',
      fontSize:18
    },
    number:{
      marginLeft:30,
      fontFamily:'medium',
      color:'white',
      fontSize:20
    },
    icon:{
      marginRight:-12,
      
    },
    boxContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-around',
      width:'100%',
      marginTop:10
    }
    
});
