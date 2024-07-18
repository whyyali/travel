import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import { SIZES } from '@/constants/theme'
import { router } from 'expo-router'

type HotelMapProps = {
    coordinates: {
        id: string,
        title: string,
        latitude: any,
        longitude: any,
        latitudeDelta: number,
        longitudeDelta: number,
    }
}

const HotelMap = ({ coordinates }: HotelMapProps) => {
    return (
        <TouchableOpacity onPress={() => {router.push({pathname:"(tab)/location", params: {coordinates: JSON.stringify(coordinates)}})}}>
            <MapView style={styles.map} region={{...coordinates, latitudeDelta:0.05, longitudeDelta: 0.05}}>
                <Marker coordinate={coordinates} title={coordinates.title} />
            </MapView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    map:{
        marginVertical: 10,
        height: 180,
        width: SIZES.width - 60,
        borderRadius: 12
    }
})

export default HotelMap