import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const LoginScreen = (props) => {

    const loginButtonPressed = () => {
        console.log("Login button pressed");
        props.navigation.navigate("HomeScreen")

    }

    const signUpButtonPressed = () => {
        console.log("Sign up button pressed");
    }

    const forgotPasswordButtonPressed = () => {
        console.log("Forgot Password button pressed");
    }
    return(
        <View style={styles.container}>
            <Image source={require("./../assets/GoGeoCache_logo.png")} style={styles.logo}/>
            <Text style={styles.caption}>Explore the world around you!</Text>
            <Text style={styles.margin_space}>Sign In to Continue</Text>
            <View style={styles.flex_row}>
                <View style={styles.flex_column}>
                    <Text style={styles.margin_space}>Email:</Text>
                    <Text style={styles.margin_space}>Password:</Text>
                </View>
                <View style={styles.flex_column}>
                    <TextInput placeholder="Enter Email Id" style={styles.margin_space}/>
                    <TextInput placeholder="Enter Password" style={styles.margin_space}/>
                </View>
            </View>

            <View style={styles.flex_row}>

                <TouchableOpacity style={styles.button} onPress={loginButtonPressed}>
                    <Text style={styles.login}> Login </Text>    
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={signUpButtonPressed}>
                    <Text style={styles.login}> Sign Up </Text>    
                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={forgotPasswordButtonPressed}>
                <Text style={styles.forgotPass}> Forgot Password? </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        height:250,
        width:250
    },
    caption:{
        fontSize: 20,
        textAlign:'center',
        margin:10,
        fontFamily:"Arial"
    },
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      height:'100%'
    },
    margin_space:{
        margin:15
    },
    flex_column: {
        display: 'flex',
        flexDirection: 'column',
        margin:5
    },
    flex_row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"center"
    },
    button:{
        borderRadius:5,
        padding:15,
        width:'auto',
        backgroundColor:'rgb(30, 138, 93)',
        margin:15
    },
    login:{
        fontWeight:'bold', 
        fontSize:15,
        textAlign:'center',
        color:'white'
    },
    forgotPass:{
        margin:40, 
        color:'rgb(30, 138, 93)'
    }
});
  
export default LoginScreen;