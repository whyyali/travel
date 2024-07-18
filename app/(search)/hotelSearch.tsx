import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useFetchHotelByCountryId } from "@/data/fetchData"
import { COLORS, SIZES } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router , useLocalSearchParams } from 'expo-router';
import ReusableTile from '@/components/resuable/tile';

interface Hotel {
    title: string
}

interface Item {
    _id: string,
    title: string,
    location: string,
    rating: string | number,
    review: string | number,
    image: any
}

const HotelSearch = () => {
    const [searchKey, setSearchKey] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false);

    const { id } = useLocalSearchParams();
    const cId = JSON.parse(id as string);

    const { hotels } = useFetchHotelByCountryId(cId);

    const handleSearch = () => {
        const filteredResults = hotels.filter((hotel: Hotel) =>
            hotel.title.toLowerCase().includes(searchKey.toLowerCase())
        );

        setSearchResults(filteredResults);
        setIsNotFound(filteredResults.length === 0 && searchKey !== "");
    };

    return (
        <SafeAreaView style={{ marginHorizontal: 20 }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <AntDesign name='left' size={24} />
                </TouchableOpacity>
                <View style={styles.wrapper}>
                    <TextInput style={styles.input} value={searchKey} onChangeText={(text) => { setSearchKey(text); handleSearch(); }} placeholder='Where you want to visit' />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Feather name='search' size={24} color={`${isNotFound ? "red" : (searchResults.length > 0 ? "green" : "black")}}`} />
                </TouchableOpacity>
            </View>

            {isNotFound ? (
                <View style={{ position: "relative" }}>
                    <View style={styles.notfound}>
                        <Text style={styles.notfoundText}>Not Found</Text>
                    </View>
                    <Image source={require("@/assets/images/search.png")} style={styles.image} />
                </View>
            ) : (
                searchResults.length > 0 ? (
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item: Item) => item._id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        renderItem={({ item }) => (
                            <View style={styles.tile}>
                                <ReusableTile item={item} onPress={() => {router.push({pathname: "(details)/hotelDetails", params:{item: JSON.stringify(item)}}) }} />
                            </View>
                        )}
                    />
                ) : (
                    <FlatList
                        data={hotels}
                        keyExtractor={(item: Item) => item._id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        renderItem={({ item }) => (
                            <View style={styles.tile}>
                                <ReusableTile item={item} onPress={() => {router.push({pathname: "(details)/hotelDetails", params:{item: JSON.stringify(item)}}) }} />
                            </View>
                        )}
                    />
                )
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: SIZES.small,
        borderColor: COLORS.blue,
        borderWidth: 1,
        marginVertical: SIZES.medium,
        borderRadius: SIZES.medium,
        height: 50
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lightWhite
    },
    wrapper: {
        flex: 1,
        marginRight: SIZES.small,
        borderRadius: SIZES.small
    },
    input: {
        paddingHorizontal: 20,
        width: "100%",
        height: "100%"
    },
    tile: {
        marginHorizontal: 12,
        marginBottom: 12,
    },
    notfound: {
        position: "absolute",
        top: 200,
        left: 0,
        right: 0
    },
    notfoundText: {
        fontSize: SIZES.xxLarge,
        color: COLORS.red,
        textAlign: "center"
    },
    image: {
        resizeMode: "contain",
        width: SIZES.width - 40,
        height: SIZES.height,
        paddingHorizontal: 20
    }
})

export default HotelSearch