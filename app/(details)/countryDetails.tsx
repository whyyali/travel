import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { COLORS, SIZES } from '@/constants/theme'
import { useFetchPlaces } from "@/data/fetchData"
import { Feather } from '@expo/vector-icons'
import ReusableDescription from '@/components/resuable/description'
import ReusableButton from '@/components/resuable/button'
import ReusableImage from '@/components/resuable/image'
import ReusableText from '@/components/resuable/text'
import ReusableBar from '@/components/resuable/bar'
import PopularList from '@/components/popular'

const Countrydetails = () => {
    const { item } = useLocalSearchParams();
    const country = JSON.parse(item as string);
    const id = country._id;

    const { popularPlaces } = useFetchPlaces(id);

    return (
        <SafeAreaView style={{marginHorizontal: 10, backgroundColor: "#f3f4f8"}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{position: "relative"}}>
                    <ReusableImage source={country.image} width={SIZES.width - 20} height={250} radius={30} />
                    <View style={styles.bar}>
                        <ReusableBar title={country.country} bgColor={COLORS.white} bgColor1={COLORS.white} onPressBack={() => {router.back()}} onPressSearch={() => {router.navigate("(search)/search")}} />
                    </View>
                </View>

                <View style={styles.description}>
                    <ReusableText text={country.region} family={"300"} size={SIZES.xLarge} color={COLORS.black} />
                    <ReusableDescription text={country.description} lines={4}/>

                    <View style={{alignContent: "center"}}>
                        <View>
                            <View style={styles.wrapper}>
                                <ReusableText text={"Popular Destinations"} family={"300"} size={SIZES.large} color={COLORS.black} />
                                <TouchableOpacity onPress={() => {router.navigate("(search)/recommedations")}}><Feather name='list' size={20}/></TouchableOpacity>
                            </View>

                            <View style={{height: 10}} />

                            <PopularList  data={popularPlaces}/>
                            <ReusableButton title='Find Best Hotels' onPress={() =>{router.push({pathname: "(search)/hotelSearch", params:{id: JSON.stringify(id)}})}} textColor={COLORS.white} width={(SIZES.width -60)} bgColor={COLORS.green} borderColor={COLORS.black} borderWidth={1}/>
                            <View style={{height: 10}} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bar:{
        marginHorizontal: 12,
        position: "absolute",
        top: 2,
        left: 0,
        right: 0,
    },      
    description:{
        marginHorizontal: 20,
        paddingTop: 20
    }
})

export default Countrydetails