import { ActivityIndicator, FlatList, StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { useFetchHotels } from "../data/fetchData"
import ReusableText from './ReusableText';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, TEXT } from '@/constants/Colors';
import HotelCard from './HotelCard';

const BestHotel = () => {
  const { hotels, isLoading } = useFetchHotels();

  return (
    <View>
      <View style={[styles.container, { paddingBottom: 20 }]}>
        <ReusableText text={"Nearby Hotels"} family={"medium"} size={TEXT.large} color={COLORS.black} />
        <TouchableOpacity onPress={() => { }}>
          <Ionicons name='list' size={20} />
        </TouchableOpacity>
      </View>


      {isLoading ? (
        <ActivityIndicator size={24} color={"red"} />
      ) : (
        <FlatList
          data={hotels}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          renderItem={({ item }) => (
            <View>
              <HotelCard item={item} margin={10} onPress={() => {}} />
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

export default BestHotel