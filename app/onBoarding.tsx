import Slide from '@/components/Slide';
import { FlatList, View } from 'react-native';

const onBoarding = () => {
    const slides = [
        {
            id: 1,
            image: require("../assets/images/onboard/1.jpg"),
            title: "Find the perfect place to stay"
        },
        {
            id: 2,
            image: require("../assets/images/onboard/2.jpg"),
            title: "Discover the world"
        },
        {
            id: 3,
            image: require("../assets/images/onboard/3.jpg"),
            title: "Find the best Motels in the world"
        },
    ]
    return (
        <View style={{}}>
            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                data={slides}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Slide item={item} />}
            />
        </View>
    )
}

export default onBoarding