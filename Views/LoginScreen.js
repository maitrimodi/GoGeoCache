import React, {useState} from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { GetUser } from "./../Services/FirebaseService";
import {setUser} from "./../Services/AsyncStorageService"
const LoginScreen = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userData, setUserData] = useState([]);
    const [noUserMsg, setNoUserMsg] = useState("");
    let isError = false;
    let userExists = false;

    useEffect(() => {
        GetUser().then((data) => {
            console.log("data receiving");
            setUserData(data);
        });
    }, []);

    const loginButtonPressed = () => {
        console.log("Login button pressed");

        if(email === ""){
            console.log("Please enter email");
            setEmailError("Please enter email");
            isError = true;
        } else {
            setEmailError("");
            isError = false;
        }

        if(password ===""){
            console.log(("Please enter password"));
            setPasswordError("Please enter password");
            isError = true;
        } else{
            setPasswordError("");
            isError = false;
        }

        
        if(!isError){
            setNoUserMsg("");
            console.log("User data" , userData);
            for(let item of userData) {
                console.log("Email received");
                console.log(item.email);
                console.log("Password received");
                console.log(item.password);
                console.log("user password");
                console.log(password);


                if(email === item.email && password === item.password){
                    console.log("user found", item.email ,email);
                    userExists = true;
                    break;
                } 
                else if(password != item.password){
                    console.log("incorrect password");
                    userExists = false;
                }
                else{
                    console.log("User not found");
                    userExists = false;
                }
            }
           


            if(userExists){
                console.log("Email sending");
                console.log(email);
                setUser(email);
                props.navigation.replace("HomeScreen", {userEmail: email});
            } 
            else  {
                // setPasswordError("incorrect username/password");
                setNoUserMsg("incorrect username/password");
            }
            
            
        }
        

    }

    const signUpButtonPressed = () => {
        console.log("Sign up button pressed");
        props.navigation.navigate("Register");
    }

    
    return(
        <View style={styles.container}>
            <Image source={require("./../assets/GoGeoCache_logo.png")} style={styles.logo}/>
            <Text style={styles.caption}>Explore the world around you!</Text>
            <Text style={styles.margin_space}>Sign In to Continue</Text>
            <View style={styles.flex_row}>
                <View style={styles.flex_column}>
                    <Text style={styles.margin_space_2}>Email:</Text>
                    <Text style={styles.margin_space_2}>Password:</Text>
                </View>
                <View style={styles.flex_column}>
                    <TextInput 
                        placeholder="Enter Email Id"
                        returnKeyType="done"
                        textContentType="emailAddress"
                        style={styles.margin_space}
                        value={email}
                        onChangeText={(data)=>{setEmail(data)}}
                        autoCapitalize="none"
                    />

                    <Text style={styles.error}>{emailError}</Text>

                    <TextInput 
                        placeholder="Enter Password" 
                        style={styles.margin_space}
                        value={password}
                        onChangeText={(data) => {setPassword(data)}}
                        autoCapitalize="none"
                    />

                    <Text style={styles.error}>{passwordError}</Text>
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

          

            <Text style={styles.error}>{noUserMsg}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        height:250,
        width:250
    },
    error:{
        color:'red'
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
    margin_space_2:{
        margin:20
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