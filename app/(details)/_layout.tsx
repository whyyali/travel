import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='countryDetails' options={{headerShown: false}}/>
      <Stack.Screen name='placeDetails' options={{headerShown: false}}/>
      <Stack.Screen name='hotelDetails' options={{headerShown: false}}/>
    </Stack>
  )
}

export default Layout