import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign, Feather } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { useFetchRecommendations } from '@/data/fetchData';
import { ReusableTile } from '@/components';
import { COLORS, SIZES } from '@/constants/Colors';
import { router } from 'expo-router';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

type Place = {
  _id: string;
  title: string;
};

const Search: React.FC<Props> = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const { recommendations: places } = useFetchRecommendations();

  const handleSearch = () => {
    const filteredResults = places.filter((place: Place) =>
      place.title.toLowerCase().includes(searchKey.toLowerCase())
    );

    setSearchResults(filteredResults);
    setIsNotFound(filteredResults.length === 0 && searchKey !== "");
  };

  return (
    <SafeAreaView style={styles.search}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.SearchButton} onPress={() => router.back()}>
          <AntDesign name='left' size={24} />
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <TextInput
            style={[styles.inputBox]}
            value={searchKey}
            onChangeText={(text) => {
              setSearchKey(text);
              handleSearch();
            }}
            placeholder='Where you want to visit'
          />
        </View>
        <TouchableOpacity style={styles.SearchButton} onPress={handleSearch}>
          <Feather name='search' size={24} color={`${isNotFound ? "red" : searchResults.length > 0 ? "green" : "black"}`} />
        </TouchableOpacity>
      </View>

      {isNotFound ? (
        <View style={{ position: "relative" }}>
          <View style={styles.NotFoundContainer}>
            <Text style={styles.NotFoundText}>Not Found</Text>
          </View>
          <Image source={require("../assets/search.png")} style={styles.SearchImage} />
        </View>
      ) : (
        <FlatList
          data={searchResults.length > 0 ? searchResults : places}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.tileBox}>
              <ReusableTile item={item} onPress={() => {}} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    marginHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SIZES.small,
    borderColor: COLORS.blue,
    borderWidth: 1,
    marginVertical: SIZES.medium,
    borderRadius: SIZES.medium,
    height: 50,
  },
  wrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  inputBox: {
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
  },
  SearchButton: {
    width: 42,
    height: 42,
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  SearchImage: {
    resizeMode: "contain",
    width: SIZES.width - 40,
    height: SIZES.height,
    paddingHorizontal: 20,
  },
  tileBox: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  NotFoundContainer: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
  },
  NotFoundText: {
    fontSize: SIZES.xxLarge,
    color: COLORS.red,
    textAlign: "center",
  },
});
