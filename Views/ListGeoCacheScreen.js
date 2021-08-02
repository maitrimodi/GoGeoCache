import React , {useState, useEffect, useRef} from 'react';
import { Text, View, Button, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

// location library imports
import * as Location from "expo-location"

// map library imports
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { fetchCacheList } from "./../Services/FirebaseService";

 
const ListGeoCacheScreen = () => {
    const [currRegion, setCurrRegion] = useState()
    const [buttomSheetIsOpen, setButtomSheetIsOpen] = useState(true)
  
    // a variable to programitically access the MapView element
    const mapRef = useRef(null)
  
    // const mapMoved = (data) => {
    //   console.log(data)
    //   // OPTIONAL: you can update the state variable and do something with the updated region info later
    //   setCurrRegion(data)
    // }

    const buttonPressed = () => {
        // 0. Request the user for permission to access their location
        Location.requestForegroundPermissionsAsync()
        .then(
          (result) => {
            console.log(`Got a result from the user`)
            console.log(result)
            // result = granted
            if (result.status === "granted") {
              console.log("User gave us permission to access their location")
    
              // 1. Assuming that the user gives you permission, we'll get the location
              // from the  device
              return Location.getCurrentPositionAsync({})
    
            }
            else {
              console.log("User denied permission")
              throw new Error("User did not grant us permission to get their location")
              // show an error  
            }
          }
        )
        .then(
          // we got the current location
          (location) => {
            console.log(`Got the location 1`)
            const coordinates = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.900,
                longitudeDelta:0.900
            }
            setCurrRegion(coordinates)
          }
        )
        .catch((err)=>{
          console.log("Error when requesting permission")
          console.log(err)
    
          // update the UI to let the user know what happened
          setMsg("Sorry, you must give us permission to access your location.")
        })
        
      }


    const [cacheList, setCacheList] = useState([]);
    const [cacheDetails, setCacheDetails] = useState();
    useEffect(()=>{
        fetchCacheList().then((data) => {
            setCacheList(data)
        })
        buttonPressed()
    }, [])
   
    return (
        <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: "50%" }}>
        {currRegion && <MapView
          style={{width:Dimensions.get("window").width, height:"100%"}}
          initialRegion={currRegion}
        //   onRegionChangeComplete={mapMoved}
          ref={mapRef}
        >
            {
                cacheList.map((_, index) => (
                    <Marker coordinate={{latitude: parseFloat(_.latitude), longitude: parseFloat(_.longitude)}}
                        title={_.cacheName}
                        description={_.cacheDetails} onPress={()=> {
                            setCacheDetails(_);
                            setButtomSheetIsOpen(true)
                        }}></Marker>
                    // <View key={`${index}`} style={styles.listItem}>
                    //     <TouchableOpacity onPress={()=> {
                    //         console.log(_)
                    //         setCacheDetails(_);
                    //     }}>
                    //         <Text  style={styles.listText}>{`${_.cacheName}`}</Text>
                    //     </TouchableOpacity>
                    //     <View style={styles.rightContainer}>
                    //         <TouchableOpacity>
                    //             <Text>Fav</Text>
                    //         </TouchableOpacity>
                    //         <View style={[styles.badge, styles.progressBadge]}>
                    //             <Text style={styles.whiteText}>In-Progress</Text>
                    //         </View>
                    //     </View>
                        
                    // </View>
                ))
            }
        </MapView> }
      </View>
       <BottomSheet isOpen={buttomSheetIsOpen} sliderMinHeight={90} onChildClick = {(event) => {
            event.stopPropagation();
        }}>
        { !cacheDetails && <>
            <Text style={styles.titleText}>All Cache Locations</Text>
            <View style={styles.listContainer}>
                <ScrollView>
                    {cacheList.map((_, index) => (
                        <View key={`${index}`} style={styles.listItem}>
                            <TouchableOpacity onPress={()=> {
                                console.log(_)
                                const coordinates = {
                                    latitude: _.latitude,
                                    longitude: _.longitude,
                                    latitudeDelta: 0.900,
                                    longitudeDelta:0.900
                                }
                                mapRef.current.animateCamera(coordinates, 2000);
                                mapRef.current.animateToRegion(coordinates, 2000)
                                console.log("HK ", coordinates)
                                // mapRef.current.animateCamera(
                                //     {center:coordinates}, 2000
                                // )
                                setCurrRegion(coordinates)
                                setCacheDetails(_);
                            }}>
                                <Text  style={styles.listText}>{`${_.cacheName}`}</Text>
                            </TouchableOpacity>
                            <View style={styles.rightContainer}>
                                <TouchableOpacity>
                                    <Text>Fav</Text>
                                </TouchableOpacity>
                                <View style={[styles.badge, styles.progressBadge]}>
                                    <Text style={styles.whiteText}>In-Progress</Text>
                                </View>
                            </View>
                            
                        </View>
                    ))}
                </ScrollView>
            </View>
        </> }
        { cacheDetails && <View style={{paddingVertical: 10}}>
            <View style={styles.detailsTitleBar}>
                <Text style={styles.detailsTitle}>{cacheDetails.cacheName}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={()=> {
                    console.log("close")
                    setCacheDetails(undefined);
                }}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsDetails}>{cacheDetails.description}</Text>
            <Text style={styles.detailsLatLng}>Latitude: {cacheDetails.latitude}, Longitude: {cacheDetails.longitude}</Text>
            <View style={styles.detailsButtons}>
                <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.whiteText}>Add to favourite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.whiteText}>Start Progress</Text>
                </TouchableOpacity>
            </View>
        </View>}
      </BottomSheet>

      
      </>
    );
  }

  const styles = {
    detailsTitleBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeIcon:{
        // position: "absolute",
        right: 20,
        backgroundColor: "red",
        padding: 10
    },
    titleText: {
        fontSize: 15,
    },
    listContainer: {
        padding: 10
    },
    listItem: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
    },
    listText: {
        fontSize: 20
    },
    badge: {
        marginLeft: 10,
        padding: 7,
        borderRadius: 3,
    },
    progressBadge: {
        backgroundColor: "rgb(30, 138, 93)",
    },
    whiteText: {
        color: "white"
    },
    rightContainer: {
        display: "flex",
        flexDirection: "row",
    },
    detailsContainer: {
        padding: 10
    },
    detailsTitle: {
        fontSize: 20
    },
    detailsDetails: {
        fontSize: 15
    },
    detailsLatLng: {
        fontSize: 15
    },
    detailsButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    detailsButton: {
        backgroundColor:'rgb(30, 138, 93)',
        color: "white",
        padding: 10,
        borderRadius: 5
    }
  }

  export default ListGeoCacheScreen;