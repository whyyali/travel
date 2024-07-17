import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFetchHotels } from "@/data/fetchData"
import { COLORS } from '@/constants/theme'
import { router } from 'expo-router'
import ReusableBar from '@/components/resuable/bar'
import ReusableTile from '@/components/resuable/tile'

interface Item {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
}

const HotelList = () => {
    const { hotels, isLoading } = useFetchHotels();
    return (
        <SafeAreaView style={{ marginHorizontal: 20 }}>
            <View style={{ height: 50 }}>
                <ReusableBar title={"Nearby Hotels"} bgColor={COLORS.white} bgColor1={COLORS.white} onPressBack={() => {router.back()}} onPressSearch={() => {router.navigate("(search)/hotelSearch")}} />
            </View>

            <View style={{ paddingTop: 10 }}>
                {isLoading ? (
                    <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 400 }} size={48} color={"red"} />
                ) : (
                    <FlatList
                        data={hotels}
                        keyExtractor={(item: Item) => item._id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 10 }}>
                                <ReusableTile item={item} onPress={() => {}} />
                            </View>
                    )} />
                )}
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default HotelList