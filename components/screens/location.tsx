import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';

type Destination = {
  id: string,
  title: string,
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

const Location = () => {
  const { coordinates } = useLocalSearchParams();

  const coordinate: Destination | null = useMemo(() => {
    try {
      return coordinates ? JSON.parse(coordinates as string) : null;
    } catch (error) {
      console.error('Error parsing coordinates:', error);
      return null;
    }
  }, [coordinates]);

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
    } else {
      console.log("coordinates are missing")
    }
  }, [coordinate]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={currentLocation}
      >
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