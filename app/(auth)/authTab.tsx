import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from '@/constants/theme';
import Login from '@/components/authentication/login';
import Register from '@/components/authentication/register';

const Tab = createMaterialTopTabNavigator();

const AuthTab = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
        <Image source={require("@/assets/images/bg1.jpg")} style={styles.bgImage}/>

        <View style={{height: 600}}>
            <Tab.Navigator>
                <Tab.Screen name='Signin' component={Login}/>
                <Tab.Screen name='Register' component={Register}/>
            </Tab.Navigator>   
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    bgImage:{
        width: SIZES.width,
        height: 300,
        borderRadius: 0,
    }
})

export default AuthTab