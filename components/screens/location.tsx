import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect, useMemo } from 'react';
import MapViewDirections from "react-native-maps-directions";
import { useLocalSearchParams } from 'expo-router';

type Destination = {
  id: string,
  title: string,
  latitude: any,
  longitude: any,
  latitudeDelta: number,
  longitudeDelta: number,
};

const Location = () => {
  const { coordinates } = useLocalSearchParams();
  
  const coordinate: Destination = useMemo(() => JSON.parse(coordinates as string), [coordinates]);

  const currentLocation = {
    latitude: 30.6682,
    longitude: 73.1114,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    title: "My Location"
  };

  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (coordinate) {
      setDestination(coordinate);
    }
  }, [coordinate]);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFillObject} initialRegion={currentLocation}>
        {destination ? (
          <>
            <Marker coordinate={currentLocation} title={currentLocation.title} />
            <Marker coordinate={destination} title={destination.title} />
            {/* <MapViewDirections origin={currentLocation} destination={destination} strokeColor='blue' strokeWidth={3} apikey='' /> */}
          </>
        ) : (
          <Marker coordinate={currentLocation} title={currentLocation.title} />
        )}
      </MapView>
    </View>
  );
};

export default Location;
