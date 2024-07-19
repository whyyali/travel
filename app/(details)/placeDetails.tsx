import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '@/constants/theme'
import { Feather } from '@expo/vector-icons'
import { useFetchPlaces } from "@/data/fetchData"
import { useEffect, useState } from 'react'
import ReusableImage from '@/components/resuable/image'
import ReusableBar from '@/components/resuable/bar'
import ReusableText from '@/components/resuable/text'
import ReusableDescription from '@/components/resuable/description'
import ReusableButton from '@/components/resuable/button'
import PopularList from '@/components/popular'
import { Place } from "@/utils/utils"

const PlaceDetails = () => {
    const { item } = useLocalSearchParams();
    const place: Place = JSON.parse(item as string);

    const id = place.country_id;

    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const { popularPlaces } = useFetchPlaces(place.country_id);

    useEffect(() => {
        if (popularPlaces) {
            const filtered = popularPlaces.filter((item: Place) => item._id !== place._id);
            setFilteredPlaces(filtered);
        }
    }, [id, popularPlaces, place._id]);

    return (
        <SafeAreaView style={{ marginHorizontal: 10, backgroundColor: "#f3f4f8" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ position: "relative" }}>
                    <ReusableImage source={place.image} width={SIZES.width - 20} height={250} radius={30} />
                    <View style={styles.bar}>
                        <ReusableBar title={place.country} bgColor={COLORS.white} bgColor1={COLORS.white} onPressBack={() => { router.back() }} onPressSearch={() => { router.navigate("(search)/search") }} />
                    </View>
                </View>

                <View style={styles.description}>
                    <ReusableText text={place.title} family={"300"} size={SIZES.xLarge} color={COLORS.black} />
                    <ReusableDescription text={place.description} lines={4} />

                    <View style={{flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 4}}>
                        <ReusableText text={"Location"} family={"300"} size={SIZES.large} color={COLORS.black} />
                        <ReusableText text={place.location} family={"300"} size={SIZES.medium} color={COLORS.black} />
                    </View>

                    <View style={{ alignContent: "center" }}>
                        <View>
                            <View style={styles.wrapper}>
                                <ReusableText text={"Popular Destinations"} family={"300"} size={SIZES.large} color={COLORS.black} />
                                <TouchableOpacity  onPress={() => { router.navigate("(search)/recommedations") }}>
                                    <Feather name='list' size={20} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 10 }} />
                            <PopularList data={filteredPlaces}/>
                            <ReusableButton title='Find Best Hotels' onPress={() => { router.push({ pathname: "(search)/hotelSearch", params: { id: JSON.stringify(id) } }) }} textColor={COLORS.white} width={(SIZES.width - 60)} bgColor={COLORS.green} borderColor={COLORS.black} borderWidth={1} />
                            <View style={{ height: 10 }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bar: {
        marginHorizontal: 12,
        position: "absolute",
        top: 2,
        left: 0,
        right: 0,
    },
    description: {
        marginHorizontal: 20,
        paddingTop: 20
    }
})

export default PlaceDetails