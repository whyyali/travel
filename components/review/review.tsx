import { FlatList, View } from 'react-native'
import ReviewTile from './reviewTile'
 
const Review= ({reviews}: any) => {
  return (
    <FlatList 
    data={reviews}
    scrollEnabled= {false}
    showsVerticalScrollIndicator = {false}
    keyExtractor={(item) => item._id}
    renderItem={({item}) => (
        <View style={{marginBottom: 15}}>
            <ReviewTile  review={item} />
        </View>
    )}
    />
  )
}

export default Review