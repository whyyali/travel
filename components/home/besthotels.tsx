import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { COLORS, SIZES, TEXT } from '@/constants/theme'
import { useFetchHotels } from "@/data/fetchData"
import { router } from 'expo-router'
import HotelCard from '../hotel/hotelCard'
import ReusableText from '../resuable/text'

interface Item {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
}

const Besthotels= () => {
    const { hotels, isLoading } = useFetchHotels();

    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, { paddingBottom: 20 }]}>
                <ReusableText text={"Best Hotels"} family={"medium"} size={TEXT.large} color={COLORS.black} />
                <TouchableOpacity onPress={() => {router.navigate("(search)/hotelList")}}>
                    <Feather name='list' size={20} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size={24} color={"red"} />
            ): (
            <FlatList
                data = { hotels }
                horizontal
                showsHorizontalScrollIndicator = { false }
                keyExtractor = { (item: Item) => item._id}
                contentContainerStyle = {{ columnGap: SIZES.medium }}
                renderItem={({ item }) => (
                <View>
                    <HotelCard item={item} margin={10} onPress={() => {}} />
                </View>
                )}
            />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default Besthotels