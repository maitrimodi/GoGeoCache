import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { validate } from "./../Services/Validation";
import { AddGeoCacheFirebase } from "./../Services/FirebaseService";

const AddGeoCache = () => {
    const [cacheName, setCacheName] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [description, setDescription] = useState("")

    const addButtonPressed = () => {
        if (!validate(cacheName, "cacheName")) {
            alert("Invalid Cache Name")
            return
        }
        if (!validate(latitude, "latLng")) {
            alert("Invalid Latitude")
            return
        }
        if (!validate(longitude, "latLng")) {
            alert("Invalid Longitude")
            return
        }
        if (!validate(description.trim(), "cacheDetails")) {
            alert("Invalid Details")
            return
        }
        AddGeoCacheFirebase({
            cacheName: cacheName,
            latitude: latitude,
            longitude: longitude,
            description: description
        }).then((added) => {
            if (added) {
                setCacheName("")
                setLatitude("")
                setLongitude("")
                setDescription("")
                alert("Data Added!")
            }
        })
    }

    return (

        <View style={styles.container}>
            <Text style={styles.caption, styles.title}>New Cache</Text>
            <View>
                <View style={styles.flex_row}>
                    <View style={styles.flex_column}>
                        <Text  style={styles.margin_space}>Cache Name:</Text>
                        <TextInput
                            style={styles.margin_space_2}
                            placeholder="Enter cache name"
                            value={cacheName}
                            onChangeText={(data) => { setCacheName(data) }} />
                        <Text style={styles.margin_space}>Lattitude:</Text>
                        <TextInput
                            style={styles.margin_space_2}
                            placeholder="Enter lattitude"
                            value={latitude}
                            onChangeText={(data) => { setLatitude(data) }} />
                        <Text style={styles.margin_space}>Longitude:</Text>
                        <TextInput
                            style={styles.margin_space_2}
                            placeholder="Enter longitude"
                            value={longitude}
                            onChangeText={(data) => { setLongitude(data) }} />
                        <Text style={styles.margin_space}>Description:</Text>
                        <TextInput
                            style={styles.margin_space_2}
                            placeholder="Enter cache description"
                            value={description}
                            onChangeText={(data) => { setDescription(data) }} />
                    </View>
                </View>
            </View>


            <TouchableOpacity style={styles.button} onPress={addButtonPressed}>
                <Text style={styles.register}> Add New Cache </Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    caption: {
        fontSize: 25,
        textAlign: 'center'
    },
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        width: '100%',

    },
    margin_space: {
        marginBottom: 12
    },
    margin_space_2: {
        marginBottom: 30
    },
    flex_column: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10,
        marginLeft: 10,
        borderColor: 'red'
    },
    flex_row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center"
    },
    button: {
        borderRadius: 5,
        padding: 15,
        width: 'auto',
        backgroundColor: 'rgb(30, 138, 93)',
        width: '80%'
    },
    register: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: 'rgb(30, 138, 93)',
        margin: 20
    }
});


export default AddGeoCache;