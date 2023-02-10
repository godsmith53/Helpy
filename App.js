import React, { useState,useEffect } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const DelhiMap = () => {
  const [markers, setMarkers] = useState([
    {
      latitude: 28.6129,
      longitude: 77.2295,
      title: 'India Gate',
      description: 'India Gate is a war memorial located in New Delhi, India.',
    },
    {
      latitude: 28.5355,
      longitude: 77.2410,
      title: 'Qutub Minar',
      description: 'Qutub Minar is a minaret located in New Delhi, India.',
    },
    {
      latitude: 28.5456,
      longitude: 77.1907,
      title: 'IIT Delhi',
      description: 'IIT Delhi is a public technical and research university located in New Delhi, India.',
    },
  ]);

  const center = {
    latitude: (markers[0].latitude ) ,
    longitude: (markers[0].longitude ) ,
  };

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      
    })();
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
    >
      <Circle
        center={center}
        radius={5000}
        strokeWidth={2}
        strokeColor="#1a66ff"
        fillColor="rgba(0, 255, 0, 0.25)"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.title}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
        >
          <Image
            source={require('./assets/repairavatar.png')}
            style={{ height: 40, width: 40 }}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default DelhiMap;
