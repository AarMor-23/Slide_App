import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="userLogin" />
            <Stack.Screen name="userRegister" />
            <Stack.Screen name="businessLogin" />
            <Stack.Screen name="businessRegister" />
        </Stack>
    );
}
