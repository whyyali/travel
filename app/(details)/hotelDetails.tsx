import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context';
import ReusableBar from '@/components/resuable/bar';
import { COLORS, SIZES } from '@/constants/theme';
import ReusableImage from '@/components/resuable/image';
import ReusableText from '@/components/resuable/text';
import ReusableDescription from '@/components/resuable/description';
import { Feather } from '@expo/vector-icons';
import ReusableButton from '@/components/resuable/button';
import Star from '@/components/star';
import HotelMap from '@/components/hotel/hotelMap';

interface Hotel {
  _id: string,
  title: string,
  location: string,
  rating: string | number,
  review: string | number,
  image: any,
  country: string,
  country_id: string,
  description: string,
  price: any,
  availability: {
    start: any,
    end: any,
  },
  coordinates:{
    latitude: any,
    longitude: any
  }
}

const HotelDetails = () => {
  const { item } = useLocalSearchParams();
  const hotel: Hotel = JSON.parse(item as string);

  const renderDate = (value: any) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  let coordinates ={
    id: hotel._id,
    title: hotel.title,
    latitude: hotel.coordinates.latitude,
    longitude: hotel.coordinates.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  return (
    <SafeAreaView style={{ marginHorizontal: 10, backgroundColor: "#f3f4f8" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 40, marginHorizontal: 12 }}>
          <ReusableBar title={hotel.country} bgColor={COLORS.white} bgColor1={COLORS.white} onPressBack={() => router.back()} onPressSearch={() => {router.push({pathname: "(search)/hotelSearch", params:{id: JSON.stringify(hotel.country_id)}})}} />
        </View>

        <View>
          <View style={styles.container}>
            <ReusableImage source={hotel.image} width={SIZES.width - 60} height={250} radius={30} />
            <View style={styles.tileContainer}>
              <View style={styles.tile}>
                <ReusableText text={hotel.title} color={COLORS.black} size={SIZES.large} family={"300"} />
                <View style={{ height: 8 }} />
                <ReusableText text={hotel.location} color={COLORS.black} size={SIZES.medium} family={"300"} />
                <View style={{ height: 5 }} />
                <View style={styles.wrapper}>
                  <View style={styles.wrapper}>
                    <Star size={24} color="#fd9942" />
                    <Star size={24} color="#fd9942" />
                    <Star size={24} color="#fd9942" />
                    <Star size={24} color="#fd9942" />
                    <Star size={24} color="gray" />
                  </View>
                  <ReusableText text={`${hotel.review} Review`} color={COLORS.gray} size={SIZES.medium} family={"300"} />
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.container, { paddingTop: 70 }]}>
            <ReusableText text={"Description"} color={COLORS.black} size={SIZES.large} family={"400"} />
            <View style={{ height: 10 }} />
            <ReusableDescription text={hotel.description} lines={4} />
            <View style={{ height: 10 }} />
            <ReusableText text={"Location"} color={COLORS.black} size={SIZES.large} family={"400"} />
            <View style={{ height: 5 }} />
            <ReusableText text={hotel.location} color={COLORS.gray} size={SIZES.medium} family={"300"} />
            {hotel.coordinates.latitude && hotel.coordinates.longitude && (
              <HotelMap coordinates={coordinates} />
            )}
            <View style={{ height: 10 }} />
            <View style={styles.wrapper}>
              <ReusableText text={"Reviews"} color={COLORS.black} size={SIZES.large} family={"400"} />
            </View>
            <View style={{ height: 15 }} />
            {/* review component here */}
            {/* comment  */}
          </View>

          <View style={[styles.wrapper, styles.bottom]}>
            <View>
              <ReusableText text={`$ ${hotel.price}`} color={COLORS.gray} size={SIZES.large} family={"bold"} />
              <ReusableText text={`${renderDate(hotel.availability.end)} - ${renderDate(hotel.availability.start)}`} color={COLORS.gray} size={SIZES.medium} family={"300"} />
            </View>
            <View style={{ width: 10, }} />
            <ReusableButton title='Select' width={(SIZES.width - 60) / 2.2} bgColor={COLORS.green} textColor={COLORS.white} onPress={() => { }} borderWidth={1} borderColor={COLORS.black} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 20
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tileContainer: {
    margin: 15,
    backgroundColor: COLORS.lightWhite,
    height: 120,
    position: "absolute",
    top: 170,
    left: 0,
    right: 0,
    borderRadius: 20
  },
  tile: {
    padding: 15,
  },
  bottom: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    height: 90,
    paddingVertical: 20
  }
})

export default HotelDetails