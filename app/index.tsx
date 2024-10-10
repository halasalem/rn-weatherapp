import { Text, View } from "react-native";
import Welcome from './../app/auth/welcome';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
      }}
    >
      <Welcome/>
    </View>
  );
}
