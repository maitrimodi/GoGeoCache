import React , {useState, useEffect, useRef} from 'react';
import { Text, View, Dimensions, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import {saveAsyncData, getAsyncData} from './../Services/AsyncStorageService';

// location library imports
import * as Location from "expo-location"

// map library imports
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { fetchCacheList } from "./../Services/FirebaseService";

 
const ListGeoCacheScreen = () => {
    const [currRegion, setCurrRegion] = useState()
    const [buttomSheetIsOpen, setButtomSheetIsOpen] = useState(true)
    const [cacheStatus, setCacheStatus] = useState("");
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [favSelected, setFavSelected] = useState();
    // a variable to programitically access the MapView element
    const mapRef = useRef(null)
  

    const startButtonPressed = (status) => {
        console.log("Start progress button clicked", cacheDetails);
        setCacheStatus("In Progress");
        getAsyncData().then((data)=>{
            let dataObj = data
            if(!dataObj)
                dataObj = {}
            dataObj[status] = dataObj[status] ? dataObj[status] : []
            if(dataObj[status].indexOf(cacheDetails.cacheName)==-1)
                dataObj[status].push(cacheDetails.cacheName)
            saveAsyncData(dataObj)
            console.log("data from dataObj");
            console.log(dataObj);
        })
    }

    const addNotesButtonPressed  = () => {
        console.log("Add note", note);
        getAsyncData().then((data)=>{
            let dataObj = data
            if(!dataObj)
                dataObj = {}
            dataObj["notes"] = dataObj["notes"] ? dataObj["notes"] : [];
            dataObj["notes"].push({
                cacheName: cacheDetails.cacheName,
                note: note
            })
            console.log("dataObj", dataObj);
            setNotes(dataObj["notes"].filter((data)=>{
                return data.cacheName == cacheDetails.cacheName
            }))
            setNote("");
            saveAsyncData(dataObj);
        })
    }
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
          //setMsg("Sorry, you must give us permission to access your location.")
        })
        
      }


    const [cacheList, setCacheList] = useState([]);
    const [cacheDetails, setCacheDetails] = useState();
    useEffect(()=>{
        fetchCacheList().then((data) => {

            let myArr = [... data]
            getAsyncData().then((asyncData)=>{
                let dataObj = asyncData
                console.log("DataObj",dataObj)
                if(!dataObj)
                    dataObj = {}
                for(let i=0; i< myArr.length; i++) {
                    if(dataObj["complete"] && dataObj["complete"].indexOf(myArr[i].cacheName)!=-1)
                        myArr[i].cacheStatus = "Complete"
                    else if(dataObj["progress"] && dataObj["progress"].indexOf(myArr[i].cacheName)!=-1)
                        myArr[i].cacheStatus = "In Progress"
                    else
                        myArr[i].cacheStatus = ""
                }
                setCacheList(myArr)
                console.log("Data maitri");
                console.log(myArr);
            })
        })
        buttonPressed()
    }, [])
   
    return (
        <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: "50%" }}>
        {currRegion && <MapView
          style={{width:Dimensions.get("window").width, height:"100%"}}
          initialRegion={currRegion}
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
                                getAsyncData().then((data)=>{
                                    let dataObj = data
                                    if(!dataObj)
                                        dataObj = {}
                                    dataObj["notes"] = dataObj["notes"] ? dataObj["notes"] : []
                                    setNotes(dataObj["notes"].filter((data)=>{
                                        return data.cacheName == _.cacheName
                                    }))
                                    console.log("notes",dataObj["notes"])
                                    
                                })
                                
                                setCacheDetails(_);
                            }}>
                                <Text  style={styles.listText}>{`${_.cacheName}`}</Text>
                            </TouchableOpacity>
                            <View style={styles.rightContainer}>
                                <TouchableOpacity>
                                    <Image source={require("./../assets/fav.png")} style={styles.logo}/>
                                </TouchableOpacity>
                                
                                <View style={[styles.badge, _.cacheStatus === "In Progress" ? styles.progressBadge: (_.cacheStatus === "Complete" ? styles.completeBadge : {}) ]}>
                                    <Text style={[_.cacheStatus === "In Progress" ? styles.blackText : (_.cacheStatus === "Complete" ? styles.whiteText : {})]}>{_.cacheStatus}</Text>
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
                    <Image source={require("./../assets/cancel.png")} style={styles.logo}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsDetails}>{cacheDetails.description}</Text>
            <Text style={styles.detailsLatLng}>Latitude: {cacheDetails.latitude}, Longitude: {cacheDetails.longitude}</Text>
            
            {notes.map((noteObj, index)=>{
                return <Text  key={index}>{noteObj.note}</Text>
            })}
            <Text>Add Notes:</Text>
            <View style={styles.detailsTitleBar}>
                <TextInput placeholder="Enter your notes about cache" value={note}
                onChangeText={(data)=>{setNote(data)}}></TextInput>
                <TouchableOpacity style={[styles.completeBadge, styles.badge]} onPress={addNotesButtonPressed}>
                    <Text style={styles.whiteText}>Add</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.detailsButtons}>
                <TouchableOpacity style={styles.detailsButton} onPress={favButtonPressed}>
                    <Text style={styles.whiteText}>Add to favourite</Text>
                </TouchableOpacity>
                {
                    console.log(cacheDetails.cacheStatus)
                }
                {cacheDetails.cacheStatus == "" && <TouchableOpacity style={styles.detailsButton} onPress={()=>{startButtonPressed("progress")}}>
                    <Text style={styles.whiteText}>Start Progress</Text>
                </TouchableOpacity>}
                {cacheDetails.cacheStatus == "In Progress" && <TouchableOpacity style={styles.detailsButton} onPress={()=>{startButtonPressed("complete")}}>
                    <Text style={styles.whiteText}>complete</Text>
                </TouchableOpacity>}
                {cacheDetails.cacheStatus == "Complete" && <Text>Completed</Text>}
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
        padding: 10,
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
        backgroundColor: "yellow"
    },
    completeBadge:{
        backgroundColor: "rgb(30, 138, 93)"
    },
    whiteText: {
        color: "white"
    },
    blackText:{
        color:"black"
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
    },
    logo:{
        height:20,
        width: 20
    }
  }

  export default ListGeoCacheScreen;