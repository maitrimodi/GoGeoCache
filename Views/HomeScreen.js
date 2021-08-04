import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';




const HomeScreen = ({navigation, route}) => {
    console.log("Route", route, navigation)
    const {userEmail} = route.params;

    console.log("data receivedx");
    console.log(userEmail);
    useEffect(() => {
        console.log(userEmail);
    })

    const searchGeoPressed = () => {
        console.log("Login button pressed");
        navigation.navigate("List Geo Cache")
    }

    const addGeoPressed = () => {
        console.log("Add button pressed");
        navigation.navigate("Add New Geo Cache")
    }
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={searchGeoPressed}>
                <Image source={require("./../assets/search.png")} style={styles.search}/>
                <Text style={styles.title}>Search for geocaches near you</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress={addGeoPressed}>
                <Image source={require("./../assets/addGeoCache.png")} style={styles.add} />
            </TouchableOpacity>
            <Text style={styles.title}>Add a New Cache</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        height: 200,
        width: 280,
        alignContent: 'center',
        paddingBottom: 20,
    },
    add: {
        height: 240,
        width: 280,
        alignContent: 'center',
        paddingBottom: 20
    },
    title:{
        color: 'green',
        fontSize: 20,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 20
    }
});


export default HomeScreen;