import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import Home from '@/components/screens/home';
import Location from '@/components/screens/location';
import Chat from '@/components/screens/chat';
import Profile from '@/components/screens/profile';

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator initialRouteName='home' screenOptions={{ tabBarActiveTintColor: "#eb6a58", tabBarInactiveTintColor: "#3e2465", tabBarStyle: styles.tabBarStyle, tabBarShowLabel: false, headerShown: false, }}>
      <Tab.Screen name='home' component={Home} options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "grid" : "grid-outline"} color={focused ? COLORS.red : COLORS.gray} size={26} />
        )}} />

      <Tab.Screen name='location' component={Location} options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "location" : "location-outline"} color={focused ? COLORS.red : COLORS.gray} size={26} />
        )}} />

      <Tab.Screen name='chat' component={Chat} options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={focused ? COLORS.red : COLORS.gray} size={26} />
        )}} />

      <Tab.Screen name='profile' component={Profile} options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} color={focused ? COLORS.red : COLORS.gray} size={26} />
        )}} />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    padding: 5,
    paddingTop: 0,
    borderRadius: 20,
    position: "absolute",
    bottom: 15,
    height: 80,
    left: 20,
    right: 20
  }
})

export default Layout