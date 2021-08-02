import React , {useState, useRef} from 'react';
import { Text, View, Button, Dimensions } from 'react-native';

// location library imports
import * as Location from "expo-location"

// map library imports
import MapView, { Marker } from 'react-native-maps';

const ListGeoCacheScreen = () => {
    const [currRegion, setCurrRegion] = useState({
      latitude:45.5163539,
      longitude: -73.5775142,
      latitudeDelta: 0.005,
      longitudeDelta:0.005
    })
  
    // state variable to display the coordinates on the screen;
    const [currCoord, setCurrCoord] = useState({})
  
    // a variable to programitically access the MapView element
    const mapRef = useRef(null)
  
    const mapMoved = (data) => {
      console.log(data)
      // OPTIONAL: you can update the state variable and do something with the updated region info later
      setCurrRegion(data)
    }
    const getLocationPressed = () => {
      // 1. get the current position
      Location.getCurrentPositionAsync({}).then(
        (location) => {
          console.log(`Got the location`)
          console.log(location)
  
          const coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
          
          // 2. update the map
          // - React function: useRef
          // - useRef allows you to programitcally access elements in your template
          // - document.querySelector()
          // - .animate()
          mapRef.current.animateCamera(
            {center:coordinates}, 2000
          )
          setCurrCoord(coordinates)
        }
      ).catch(
        (err) => {
          console.log(err)
        }
      )
  
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Map Screen</Text>
        <MapView
          style={{width:Dimensions.get("window").width, height:500}}
          initialRegion={currRegion}
          onRegionChangeComplete={mapMoved}
          ref={mapRef}
        >
          <Marker coordinate={{latitude:45.5163539, longitude:-73.5775142}}
            title="Schwartz's Deli"
            description="We make a really good sandwich"></Marker>
          <Marker coordinate={{latitude:45.515940, longitude:-73.577550}}
            title="Main Street Deli"
            description="We also make a really good sandwich"></Marker>
        </MapView>
        <Button onPress={getLocationPressed} title="Move To Device Location"/>
        <Text>{JSON.stringify(currCoord)}</Text>
      </View>
    );
  }

  export default ListGeoCacheScreen;