import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='search' options={{headerShown: false}}/>
      <Stack.Screen name='hotelSearch' options={{headerShown: false}}/>
      <Stack.Screen name='recommedations' options={{headerShown: false}}/>
      <Stack.Screen name='hotelList' options={{headerShown: false}}/>
      <Stack.Screen name='findHotels' options={{headerShown: false}}/>
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})