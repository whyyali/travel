import { FlatList, View, ListRenderItem } from 'react-native'
import ReusableTile from './resuable/tile'
import { router } from 'expo-router';
import React from 'react';
import { Item } from '@/utils/utils';
  
type PopularListProps = {
  data: Item[];
};

const PopularList: React.FC<PopularListProps> = ({data} : any) => {
    const renderItem: ListRenderItem<Item> = ({item}) => (
        <View style={{marginBottom: 20}}>
            <ReusableTile item={item} onPress={() => {router.push({pathname: "(details)/placeDetails", params:{item: JSON.stringify(item)}})}}/>
        </View>
    )
  return (
    <FlatList 
    data={data} 
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}
    renderItem={renderItem}
    />
  )
}

export default PopularList