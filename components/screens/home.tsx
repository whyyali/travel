import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, TEXT } from '@/constants/theme';
import { AntDesign } from '@expo/vector-icons';
import ReusableText  from '../resuable/text';
import { Besthotels, Places, Recommendations } from '../home';
import { router } from 'expo-router';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.wrapper}>
                    <ReusableText text='Hi User!' size={TEXT.large} color={COLORS.black} family={400}/>
                    <TouchableOpacity style={styles.icon} onPress={() => {router.navigate("(search)/search")}}>
                        <AntDesign name='search1' size={26}/>
                    </TouchableOpacity>
                </View>

                <View style={{height: SIZES.xLarge}} />

                <ReusableText text='Places' family={"medium"} size={TEXT.large} color={COLORS.black} />

                <Places />

                <View style={{height: 15}} />

                <Recommendations />

                <View style={{height: 15}} />

                <Besthotels />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    icon:{
        backgroundColor: COLORS.white,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Home