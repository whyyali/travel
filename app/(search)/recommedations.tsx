import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFetchRecommendations } from "@/data/fetchData"
import { COLORS, SIZES, TEXT } from '@/constants/theme';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import ReusableText from '@/components/resuable/text';
import ReusableTile from '@/components/resuable/tile';

interface Item {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
}

const Recommedations = () => {
    const { recommendations, isLoading } = useFetchRecommendations();

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <AntDesign name='left' size={24} />
                </TouchableOpacity>
                <ReusableText text={"Recommendation"} family={"medium"} size={TEXT.large} color={COLORS.black} />
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Feather name='list' size={24} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
                    <ActivityIndicator size={48} color={"red"} />
                </View>
            ) : (
                <FlatList
                    data={recommendations}
                    alwaysBounceVertical
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: Item) => item._id}
                    contentContainerStyle={{ columnGap: SIZES.medium, paddingTop: 15, paddingBottom: 60 }}
                    renderItem={({ item }) => (
                        <View style={styles.tile}>
                            <ReusableTile item={item} onPress={() => {router.push({pathname: "(details)/placeDetails", params:{item: JSON.stringify(item)}})}} />
                        </View>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 35,
        marginHorizontal: 20
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lightWhite
    },
    tile: {
        marginHorizontal: 12,
        marginBottom: 12,
    },
})

export default Recommedations