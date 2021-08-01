import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';



const HomeScreen = (props) => {

    const searchGeoPressed = () => {
        console.log("Login button pressed");
        props.navigation.navigate("Search Geo Cache")
    }

    const addGeoPressed = () => {
        console.log("Add button pressed");
        props.navigation.navigate("Add New Geo Cache")
    }

    const favGeoPressed = () => {
        console.log("Fav button pressed");
        props.navigation.navigate("Favorites")
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={searchGeoPressed}>
                <Image source={require("./assets/search.png")} style={styles.logo}/>
            </TouchableOpacity>

            <Text>Search for geochaches near you</Text>
          

            <TouchableOpacity onPress={addGeoPressed}>
                <Image source={require("./assets/addGeoCache.png")} style={styles.logo}/>
            </TouchableOpacity>


            <Text>Add a New Cache</Text>

            <TouchableOpacity onPress={favGeoPressed}>
                <Image source={require("./assets/fav.png")} style={styles.logo}/>
            </TouchableOpacity>
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
        height: 200,
        width: 200,
        alignContent: 'center'
    }
});


export default HomeScreen;