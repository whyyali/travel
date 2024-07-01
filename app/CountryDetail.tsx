import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { ImageBox } from '@/components'
import { images } from '@/images'
import { COLORS, SIZES } from '@/constants/Colors'

type CountryDetailRouteProp = RouteProp<{ CountryDetail: { item: { _id: string, country: string, image: any } } }, 'CountryDetail'>

const CountryDetail: React.FC = () => {
    const route = useRoute<CountryDetailRouteProp>()
    const { item } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ position: "relative" }}>
                    <ImageBox source={images[item.country.toLowerCase()]} width={SIZES.width - 10} height={250} radius={30} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 12,
    },
})

export default CountryDetail
