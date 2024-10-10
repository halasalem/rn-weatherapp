import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native'; // ActivityIndicator displays a loading spinner while data is being fetched
import React, { useCallback, useState } from 'react'; 
// useState keeps track of what the user types & weather the app is currently loading data
// useCallback wraps the function that fetches data (ensures that it doesnt get recreated everytime the component updates)
import { useRouter } from 'expo-router'; //allows for navigation

export default function Welcome() {

    const [input, setInput] = useState(""); 
    // input: holds the inputted city name, its initially an empty string
    // setInput: updates the value of input as the user types
    const [loading, setLoading] = useState(false);
    // loading: a bollean that tracks if the app is currently fetching data, its initially false
    const router = useRouter();

    const baseUrl= 'https://api.openweathermap.org/data/2.5/';
    const key='7352b4e8e6f341c198324a814cef5180';

    const fetchDataHandler = useCallback(async () => { 
        //useCallback ensures fetchDataHandler doesnt change change unless input or router changes (hence input, router in [])
        // async allows for certain things to happen (like data being fetched) without freezing the app.

        if (!input) return; 
        setLoading(true);

        try { 
          const response=await fetch(`${baseUrl}weather?q=${input}&appid=${key}`);
          // the fetch function sends a request to the API with the url
          //await means 'wait until this action if finished before moving onto the next line'
          const weatherData=await response.json(); // converts it to javascript

          if(response.ok){
            router.push({
              pathname:'/auth/weather-info',
              params:{weatherData:JSON.stringify(weatherData)}, //converts the javascript object to string
            });
          } else {
            console.error(weatherData);
            alert(weatherData.message);
          }

        } catch (error) { // 'catch' handles network errors 
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again later.');
        } finally { // 'finally' runs weather the request suceeded or fails 
            setLoading(false);
        }
    }, [input, router]);

    return (
        <View>
            <Image
                source={require('./../../../assets/images/weatherpic2.jpeg')}
                style={{
                    width: '100%',
                    height: 500,
                }}
            />
            <View
                style={{
                    backgroundColor: 'white',
                    height: '100%',
                    marginTop: -20,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontFamily: 'bold',
                        padding: 15,
                        textAlign:'center'
                    }}
                >
                    Welcome!
                </Text>

                <Text style={{
                  fontFamily:'regular',
                  textAlign:'center',
                  fontSize:18,
                  color:'gray',
                  marginTop:20,
                  marginBottom:30
                }}>Stay informed with real-time weather updates for any city around the world.Enter a city to see current temperature, conditions, and more—helping you plan your day with ease.</Text>

                <TextInput
                    placeholder="Enter city name"
                    onChangeText={(text) => setInput(text)} //updates the input state whenever the user types
                    value={input}
                    placeholderTextColor={'white'}
                    style={styles.textInput}
                    onSubmitEditing={fetchDataHandler} // Call fetchDataHandler to get the weather data when the user presses enter
                />
                 {loading && <ActivityIndicator size="large" color="#0000ff" />}  
                 {/* shows the spinner when loading */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 50,
        marginTop: '5%',
        color: 'white',
        width:'80%',
        alignSelf:'center'
    },
});
