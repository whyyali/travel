import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReusableText from './ReusableText'
import { COLORS, TEXT } from '@/constants/Colors'
import ImageBox from './ImageBox'
import { images } from "../images"
import { useNavigation } from '@react-navigation/native'

type CountryProps = {
    item: {
        _id: string,
        country: string,
        image: any
    }
}

const Country: React.FC<CountryProps> = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("CountryDetail", { item })}>
            <View>
                <ImageBox source={images[item.country.toLowerCase()]} height={85} width={85} radius={12} />
                <View style={{ height: 5 }} />
                <ReusableText text={item.country} family={"500"} size={TEXT.medium} color={COLORS.black} align={"center"} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default Country
