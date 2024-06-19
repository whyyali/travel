import { ActivityIndicator, StyleSheet, View, VirtualizedList, ListRenderItem } from 'react-native';
import { useFetchAllCountries } from "../data/fetchData";
import { SIZES } from '@/constants/Colors';
import Country from './Country';
import React from 'react';

type CountryType = {
    _id: string,
    country: string,
    image: any
}

const Places = () => {
    const { countries, isLoading } = useFetchAllCountries();

    const renderItem: ListRenderItem<CountryType> = ({ item }) => (
        <View style={{ marginRight: SIZES.medium }}>
            <Country item={item} />
        </View>
    );

    const getItemCount = (data: CountryType[]) => data.length;
    const getItem = (data: CountryType[], index: number) => data[index];

    return (
        <View>
            <View style={{ height: 20 }} />
            {isLoading ? (
                <ActivityIndicator size={24} color={"red"} />
            ) : (
                <VirtualizedList
                    data={countries}
                    horizontal
                    keyExtractor={(item) => item._id.toString()}
                    showsHorizontalScrollIndicator={false}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    renderItem={renderItem}
                />)}

        </View>
    )
}

const styles = StyleSheet.create({})

export default Places