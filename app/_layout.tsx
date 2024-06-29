import { Stack } from "expo-router"

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name="onBoarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Search" options={{ headerShown: false}} />
            <Stack.Screen name="CountryDetail" options={{ headerShown: false}} />
        </Stack>
    )
}