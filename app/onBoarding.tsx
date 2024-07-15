import { FlatList, StyleSheet, View } from 'react-native'
import Slide from '@/components/slide';

const onBoard = () => {
    const slides = [
        {
            id: 1,
            image: require("@/assets/images/onBoard/1.jpg"),
            title: "Find the perfect place to stay"
        },
        {
            id: 2,
            image: require("@/assets/images/onBoard/2.jpg"),
            title: "Discover the world"
        },
        {
            id: 3,
            image: require("@/assets/images/onBoard/3.jpg"),
            title: "Find the best Motels in the world"
        },
    ];
    return (
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default onBoard