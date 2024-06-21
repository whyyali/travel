import { BestHotel, Places , Recommendations, ReusableText} from '@/components'
import { COLORS, SIZES, TEXT } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>

        <View style={styles.containerRow}>
          <ReusableText text='Hi User!' family={400} size={TEXT.large} color={COLORS.black} />
          <TouchableOpacity onPress={() => { }} style={styles.searchBox}>
            <Ionicons name='search' size={26} />
          </TouchableOpacity>
        </View>

        <View style={{ height: SIZES.xLarge }} />

        <ReusableText text={"Places"} family={"medium"} size={TEXT.large} color={COLORS.black} />

        <Places />

        <View style={{ height: 15 }} />

        <Recommendations />

        <View style={{ height: 15 }} />

        <BestHotel />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  searchBox: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default Home