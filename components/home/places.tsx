import { ActivityIndicator, FlatList, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useFetchAllCountries } from "@/data/fetchData";
import { SIZES } from '@/constants/theme';
import Country from './country';

interface CountryProps {
    _id: string,
    country: string,
    image: any,
    description: string,
    region: string
}

const Places = () => {
    const { countries, isLoading } = useFetchAllCountries();
    return (
        <View>
            <View style={{ height: 20 }} />
            {isLoading ? (
                <ActivityIndicator size={24} color={"red"} />
            ) : (
                <VirtualizedList
                    data={countries}
                    horizontal
                    keyExtractor={(item: CountryProps) => item._id}
                    showsHorizontalScrollIndicator={false}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    renderItem={({ item, index }) => (
                        <View style={{ marginRight: SIZES.medium }} key={index}>
                            <Country item={item} />
                        </View>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({})

export default Places