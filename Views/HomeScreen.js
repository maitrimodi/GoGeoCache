import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
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

    const favGeoPressed = () => {
        console.log("Fav button pressed");
        navigation.navigate("Favorites")
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={searchGeoPressed}>
                <Image source={require("./../assets/search.png")} style={styles.logo}/>
            </TouchableOpacity>
            <Text style={styles.title}>Search for geocaches near you</Text>

            <TouchableOpacity onPress={addGeoPressed}>
                <Image source={require("./../assets/addGeoCache.png")} style={styles.logo}/>
            </TouchableOpacity>
            <Text style={styles.title}>Add a New Cache</Text>

            <TouchableOpacity onPress={favGeoPressed}>
                <Image source={require("./../assets/fav.png")} style={styles.logo}/>
            </TouchableOpacity>
            <Text style={styles.title}>Favorites</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 180,
        width: 280,
        alignContent: 'center'
    },
    title:{
        color: 'green',
        fontSize: 20,
        paddingBottom: 5
    }
});


export default HomeScreen;