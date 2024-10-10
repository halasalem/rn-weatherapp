import React, { useState, useEffect } from 'react';
import { View, Text,ScrollView, StyleSheet, Dimensions,ImageBackground,TouchableOpacity } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FiveDayForecast() {
    
    const router = useRouter(); // navigate back to prevous screens
    const key='7352b4e8e6f341c198324a814cef5180';
    const baseUrl='https://api.openweathermap.org/data/2.5/';

    const [forecastData,setForecastData]=useState([]); //holds the temp data for the next 5 days
    const [loading,setLoading]=useState(false);
    const {city}=useLocalSearchParams(); // holds the city name passed from weather-info
    const [labels,setLabels]=useState([]); //stores the dates
    const [temps,setTemps]=useState([]);

    useEffect(()=>{ //triggers fetchForecastData when the city value changes

        if(city){
            fetchForecastData(city);
        }
    },[city]); // dependancy array; ensures the effect only runs if city changes

    const fetchForecastData=async(city)=>{ //uses the city name to get the forecast data
        setLoading(true);
        try{
            const response=await fetch(`${baseUrl}forecast?q=${city}&appid=${key}`);
            const data=await response.json();

            if(response.ok){
                const tempMap={}; // a temp object that gathers tempertaure sums & counts for each date
                data.list.forEach(entry => {
                    //data.list : array that holds the forecast for every 3 hrs
                    //forEach: loops through each item in data.list
                    const date=entry.dt_txt.split(' ')[0]; // splitting the date and time (only keeping date)
                    if(!tempMap[date]){
                        tempMap[date]={sum:0,count:0};
                    } //checks if there is a date entry, if not, it inializes sum with 0 and count with 0
                    tempMap[date].sum+=Math.round(entry.main.temp-273.15); 
                    // summing the temps for each date
                    tempMap[date].count+=1; // counts the no. of temps for the date
                });

                const dates=Object.keys(tempMap).slice(0,5); // gets all the dates (as keys) from tempMap
                const avgtemps=dates.map(date => Math.round(tempMap[date].sum/tempMap[date].count));
                //dates.map: iterates over each date
                // date => : for each date it calculates the avg temp

                setForecastData(avgtemps);
                setLabels(dates);
                setTemps(avgtemps)
            }
            else{
                alert(data.message);
            }
        }
        catch(error){
            console.error('Error fetching data',error);
            alert('Error fetching data.Please try again later');
        } finally {
            setLoading(false);
        }

    };
    if (loading){
        return <Text>Loading...</Text>
    }

    return (
    <ImageBackground
        source={require('./../../../assets/images/weatherpic2.jpeg')}
        style={styles.background}
        resizeMode='cover'
        > 
        
        
        
        
        <TouchableOpacity onPress={()=>router.back()} 
          style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity> 

       
        <Text style={styles.title}>5-Day Forecast: </Text>
        <Text style={{
            fontFamily:'rmedium',
            color:'gray',
            fontSize:30,
            marginLeft:30
            
        }}>{city}</Text>

        

        <View style={styles.container}>
            {forecastData.length > 0 && labels.length > 0 && (
                <LineChart
                    data ={{
                        labels: labels,
                        datasets: [{
                            data: forecastData,
                        }],
                    }}
                    width={Dimensions.get("window").width} // makes the chart as wide as the screen
                    height={400}
                    yAxisLabel=""
                    yAxisSuffix='°C' // adds the symbol next to each y-axis value
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#ADD8E6",
                        backgroundGradientTo: "#6495ED",
                        decimalPlaces: 0, // Optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 50,
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#1E90FF",
                        },
                        propsForLabels:{
                            fontFamily:'Arial',
                            fontSize:12,
                            fontWeight:'bold',
                            fill:'black'
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 70,
                        borderRadius: 40,
                        marginRight:30
                    }}
                    
                />
            )}
        </View>

        
        
        
        
        <ScrollView style={{
            //backgroundColor:'#D3D3D3',
            backgroundColor:'transparent',
            marginTop:-20,
            height:'100%',
            borderTopLeftRadius:30, 
            borderTopRightRadius:30, 
            //padding:15,
            flexDirection:'row',
            marginBottom:50,
            
            
            
        }}
        contentContainerStyle={{paddingHorizontal:0,alignItems:'center',justifyContent:'flex-start'}} //no padding in the scroll view
        horizontal={true} //horizontal scrolling
        showsHorizontalScrollIndicator={false} //hide the scroll bar
        >
        

            <View style={styles.box}>
                <Text style={styles.day}>Day 1</Text>
                <Text style={styles.date}>{labels[0]}</Text>
                <Text style={styles.temp}>{temps[0]}°</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.day}>Day 2</Text>
                <Text style={styles.date}>{labels[1]}</Text>
                <Text style={styles.temp}>{temps[1]}°</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.day}>Day 3</Text>
                <Text style={styles.date}>{labels[2]}</Text>
                <Text style={styles.temp}>{temps[2]}°</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.day}>Day 4</Text>
                <Text style={styles.date}>{labels[3]}</Text>
                <Text style={styles.temp}>{temps[3]}°</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.day}>Day 5</Text>
                <Text style={styles.date}>{labels[4]}</Text>
                <Text style={styles.temp}>{temps[4]}°</Text>
            </View>
            

            
                    
        </ScrollView>

        



        </ImageBackground>
        
    );

   
    
                    
}

const styles=StyleSheet.create({
    container:{
        padding:20,
    },
    title:{
        fontSize:40,
        fontFamily:'rbold',
        color:'#696969',
        marginTop:80,
        marginLeft:30
        //textAlign:'center'
    },
    background:{
        height:'100%',
        
    },
    backButton:{
        position:'absolute',
        top:40,
        left:20,
        zIndex:1,
        
    },
    box:{
        //backgroundColor:'#778b99',
        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:2,
        height:100,
        borderRadius:35,
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:20,
        //marginBottom:30,
        alignItems:'center',
        //marginTop:20,
        
        
        
      },
      day:{
        marginBottom:5,
        fontFamily:'rbold'
      },
      date:{
        marginBottom:5,
        fontSize:10,
        fontFamily:'rbold',
        color:'#A9A9A9'
      },
      temp:{
        fontSize:20,
        fontFamily:'rbold',
        color:'gray'

      }
    
})
