import { Stack } from "expo-router";

// OPTIONAL: If you have an auth hook/context, plug it in here.
// import { useAuth } from "../../src/auth/AuthContext";

export default function AuthLayout() {
    // OPTIONAL auth guard (recommended):
    // const { user, loading } = useAuth();
    // if (loading) {
    //   return (
    //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    // // If already logged in, kick them out of auth screens:
    // if (user) return <Redirect href="/" />; // or "/(tabs)" etc.

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                // headerBackTitleVisible: false,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="userLogin"
                options={{ title: "User Login" }}
            />
            <Stack.Screen
                name="userRegister"
                options={{ title: "Create Account" }}
            />
            <Stack.Screen
                name="businessLogin"
                options={{ title: "Business Login" }}
            />
            <Stack.Screen
                name="businessRegister"
                options={{ title: "Business Sign Up" }}
            />
        </Stack>
    );
}
