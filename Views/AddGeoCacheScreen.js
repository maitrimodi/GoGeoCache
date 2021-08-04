import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { validate } from "./../Services/Validation";
import { AddGeoCacheFirebase } from "./../Services/FirebaseService";

const AddGeoCache = () => {
    const [cacheName, setCacheName] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [description, setDescription] = useState("")
    return(
        <View style={styles.box}>
             <TextInput
                placeholder="Enter cache name"
                value={cacheName}
                onChangeText={(data)=>{setCacheName(data)}}/>
            <TextInput
                placeholder="Enter latitude"
                value={latitude}
                onChangeText={(data)=>{setLatitude(data)}}/>
            <TextInput
                placeholder="Enter latitude"
                value={longitude}
                onChangeText={(data)=>{setLongitude(data)}}/>
            <TextInput
                placeholder="Enter details"
                value={description}
                onChangeText={(data)=>{setDescription(data)}}/>
            <Button title="Add New Cache" onPress={()=> {
                if(!validate(cacheName, "cacheName")){
                    alert("Invalid Cache Name")
                    return
                }
                if(!validate(latitude, "latLng")) {
                    alert("Invalid Latitude")
                    return
                } 
                if(!validate(longitude, "latLng")) {
                    alert("Invalid Longitude")
                    return
                }
                if(!validate(description.trim(), "cacheDetails")) {
                    alert("Invalid Details")
                    return
                }
                AddGeoCacheFirebase({
                    cacheName: cacheName,
                    latitude: latitude,
                    longitude: longitude,
                    description: description
                }).then((added) => {
                    if(added) {
                        setCacheName("")
                        setLatitude("")
                        setLongitude("")
                        setDescription("")
                        alert("Data Added!")
                    }
                })
            }}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:50,
        marginBottom:20,
        borderColor: 'rgb(30, 138, 93)'
    }
    
});

export default AddGeoCache;