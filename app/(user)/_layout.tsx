import { Stack } from "expo-router";

export default function UserLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                // headerBackTitleVisible: false,
                // animation: "slide_from_right",
            }}
        >
            <Stack.Screen
                name="Home"
                options={{ title: "Business Home" }}
            />
        </Stack>
    );
}
