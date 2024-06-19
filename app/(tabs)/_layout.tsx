import { BottomTabIcon } from '@/components/BottomTab';
import { COLORS } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.red,
                headerShown: false,
                tabBarStyle: {padding: 4, paddingBottom:8, height: 60}
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <BottomTabIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="location"
                options={{
                    title: 'Location',
                    tabBarIcon: ({ color, focused }) => (
                        <BottomTabIcon name={focused ? 'location' : 'location-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color, focused }) => (
                        <BottomTabIcon name={focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <BottomTabIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
