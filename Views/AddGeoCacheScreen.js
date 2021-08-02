import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { validate } from "./../Services/Validation";
import { db } from "./../Services/FirebaseManager";
import { AddGeoCacheFirebase } from "./../Services/FirebaseService";

const AddGeoCache = () => {
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [description, setDescription] = useState("")
    return(
        <View style={{padding: 10}}>
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
            <Button title="Add Cash" onPress={()=> {
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
                    latitude: latitude,
                    longitude: longitude,
                    description: description
                }).then((added) => {
                    if(added) {
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

export default AddGeoCache;