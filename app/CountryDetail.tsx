import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

type CountryDetailRouteProp = RouteProp<{ CountryDetail: { item: { _id: string, country: string, image: any } } }, 'CountryDetail'>

const CountryDetail: React.FC = () => {
    const route = useRoute<CountryDetailRouteProp>()
    const { item } = route.params

    return (
        <View style={styles.container}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.countryName}>{item.country}</Text>
            {/* Add more details as needed */}
        </View>
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
    countryName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
})

export default CountryDetail
