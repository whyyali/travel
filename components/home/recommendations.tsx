import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES, TEXT } from '@/constants/theme'
import { Feather } from '@expo/vector-icons'
import { useFetchRecommendations } from "@/data/fetchData"
import ReusableText from '../resuable/text'
import ReusableTile from '../resuable/tile'
import { router } from 'expo-router'
import { Item } from '@/utils/utils'

const Recommendations = () => {
    const { recommendations, isLoading } = useFetchRecommendations();
    
    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, { paddingBottom: 20 }]}>
                <ReusableText text={"Recommendations"} family={"medium"} size={TEXT.large} color={COLORS.black} />
                <TouchableOpacity onPress={() => {router.navigate("(search)/recommedations")}}>
                    <Feather name='list' size={20} />
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <ActivityIndicator size={24} color={"red"} />
            ) : (
                <FlatList
                    data={recommendations}
                    horizontal
                    showsHorizontalScrollIndicator = {false}
                    keyExtractor={(item: Item) =>  item._id}
                    contentContainerStyle = {{columnGap: SIZES.medium}}
                    renderItem={({item}) => (
                        <View>
                            <ReusableTile item={item} onPress={() => {router.push({pathname: "(details)/placeDetails", params:{item: JSON.stringify(item)}})}}/>
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

export default Recommendations