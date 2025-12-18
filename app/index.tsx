import { navigate } from "expo-router/build/global-state/routing";
import { useEffect } from "react";
import { Text, View } from "react-native";

useEffect(() => {
  return () => {
    navigate('/auth/userLogin');
  }
}, [])


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
