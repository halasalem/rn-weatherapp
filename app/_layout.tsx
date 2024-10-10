import { Stack } from "expo-router";
import {useFonts} from 'expo-font';

export default function RootLayout() {
  useFonts({
    'regular':require('./../assets/fonts/Outfit-Regular.ttf'),
    'medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'bold':require('./../assets/fonts/Outfit-Bold.ttf'),
    'rbold':require('./../assets/fonts/RobotoCondensed-Bold.ttf'),
    'rmedium':require('./../assets/fonts/RobotoCondensed-Medium.ttf'),
    'rregular':require('./../assets/fonts/RobotoCondensed-Regular.ttf'),



  })
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="auth/welcome/index" />
      <Stack.Screen name="auth/weather-info/index"/>
      <Stack.Screen name="auth/fiveDay-forecast/index"/>
    </Stack>
  );
}
