import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, ListRenderItem } from 'react-native'
import React from 'react'
import { COLORS, SIZES, TEXT } from '@/constants/Colors'
import ReusableText from './ReusableText'
import { Feather } from '@expo/vector-icons'
import { useFetchRecommendations } from '../data/fetchData'
import ReusableTile from './ReusableTile'


type RecommendationProps = {
    item: {
        _id: string;
        title: string;
        location: string;
        review: string;
        rating: number; 
    };
}

const Recommendations = () => {
    const {isLoading, recommendations} = useFetchRecommendations();

    const renderItem: ListRenderItem<RecommendationProps> = ({ item }) => (
        <View style={{ marginRight: SIZES.medium }}>
            <ReusableTile item={item} onPress={() =>{}} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.containerRow, { paddingBottom: 20 }]}>
                <ReusableText text={"Recommendation"} family={"medium"} size={TEXT.large} color={COLORS.black} />
                <TouchableOpacity onPress={() => {}}>
                    <Feather name='list' size={20} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size={24} color={"red"} />
            ) : (
                <FlatList
                    data={recommendations}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={{ columnGap: SIZES.medium }}
                    renderItem={renderItem}
                />
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 24
    },
    containerRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})

export default Recommendations