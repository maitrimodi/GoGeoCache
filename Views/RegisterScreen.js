import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import { validate } from "./../Services/Validation";
import { AddUser } from "./../Services/FirebaseService";
const RegisterScreen = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");


    let isError = false;
    const RegisterButtonPressed = () => {
        console.log("Register button pressed");
        if(firstName === ""){
            setFirstNameError("Please enter your first name");
            console.log("Please enter your first name");
            isError = true;
        } else if(!validate(firstName, "userName")){
            // alert("Invalid First Name");
            setFirstNameError("Invalid First Name");
            console.log("Invalid First Name");
            isError = true;
        } else {
            setFirstNameError("");
        }

        if(lastName === ""){
            setLastNameError("Please enter your last name");
            console.log("Please enter your last name");
            isError = true;
        } else if(!validate(lastName, "userName")){
            setLastNameError("Invalid Last Name");
            console.log("Invalid Last Name");
            isError = true;
        } else {
            setLastNameError("");
        }

        if(!validate(email, "email")){
            setEmailError("Invalid Email Address");
            console.log("Invalid Email Address");
            isError = true;
        } else {
            setEmailError("");
        }

        if(!validate(phone, "phone")){
            setPhoneError("Invalid Phone Number(111-111-1111)");
            console.log("Invalid Phone Number Ex:111-111-1111");
            isError = true;
        } else {
            setPhoneError("");
        }

        if(password === ""){
            setPasswordError("Please enter password");
            console.log("Please enter password");
            isError = true;
        } else {
            setPasswordError("");
        }

        if(confirmPassword === ""){
            setConfirmPasswordError("Please enter your password again");
            console.log("Please enter your password again");
            isError = true;
        } else if(confirmPassword !== password){
            setConfirmPasswordError("Passwords does not match");
            console.log("Passwords does not match");
            isError = true;
        } else {
            setConfirmPasswordError("");
        }
        console.log("Before navigating" + isError);
        console.log(isError);

        if (!isError){
            console.log("after");
            console.log({isError});
            // add user to the db
            AddUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password
            }).then((added) => {
                if(added){
                    alert("User registered successfully!")
                }
            })
            props.navigation.navigate("Login");
        }
        
    }
    return (
        <View style={styles.container}> 
            <Text style={styles.caption,styles.title}>Register yourself</Text>
            <View style={styles.box}>
                <View style={styles.flex_row}>
                    <View style={styles.flex_column}>
                        <Text style={styles.margin_space_2}>First Name:</Text>
                        <Text style={styles.margin_space_2}>Last Name:</Text>
                        <Text style={styles.margin_space_2}>Email:</Text>
                        <Text style={styles.margin_space_2}>Phone:</Text>
                        <Text style={styles.margin_space_2}>Password:</Text>
                        <Text style={styles.margin_space_2}>Confirm Password:</Text>
                    </View>
                    <View style={styles.flex_column}>
                        <TextInput 
                            placeholder="Enter your first name"
                            value={firstName}
                            onChangeText={(data)=>{setFirstName(data)}}/>

                        <Text  style={[styles.margin_space, styles.error]}>{firstNameError}</Text>

                        <TextInput 
                            placeholder="Enter your last name"
                            value={lastName}
                            onChangeText={(data)=>{setLastName(data)}}/>
                        <Text  style={[styles.margin_space, styles.error]}>{lastNameError}</Text>

                        <TextInput 
                            placeholder="Enter your Email Id" 
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(data)=>{setEmail(data)}}/>

                        <Text  style={[styles.margin_space, styles.error]}>{emailError}</Text>

                        <TextInput 
                            placeholder="Enter your phone number"
                            value={phone}
                            onChangeText={(data)=>{setPhone(data)}}/>

                        <Text  style={[styles.margin_space, styles.error]}>{phoneError}</Text>

                        <TextInput 
                            placeholder="Enter Password"
                            value={password}
                            autoCapitalize="none"
                            onChangeText={(data)=>{setPassword(data)}}/>
                        
                        <Text  style={[styles.margin_space, styles.error]}>{passwordError}</Text>

                        <TextInput 
                            placeholder="Re-enter above password"
                            value={confirmPassword}
                            autoCapitalize="none"
                            onChangeText={(data)=>{setConfirmPassword(data)}}/>
                        
                        <Text  style={[styles.margin_space, styles.error]}>{confirmPasswordError}</Text>
                    </View>
                </View>
            </View>
            

            <TouchableOpacity style={styles.button} onPress={RegisterButtonPressed}>
                <Text style={styles.register}> Register </Text>    
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    caption:{
        fontSize: 20,
        textAlign:'center',
        fontFamily:"Arial"
    },
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      height:'100%',
      width:'100%',
      
    },
    box:{
        borderWidth:1,
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:50,
        marginBottom:20,
        borderColor: 'rgb(30, 138, 93)'
    },
    margin_space:{
        marginBottom:50
    },
    margin_space_2:{
        marginBottom:64
    },
    flex_column: {
        display: 'flex',
        flexDirection: 'column',
        marginRight:10,
        marginLeft:10
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
        width:'80%'
    },
    register:{
        fontWeight:'bold', 
        fontSize:15,
        textAlign:'center',
        color:'white'
    },
    title:{
        fontSize:20,
        textAlign:'center',
        color:'rgb(30, 138, 93)',
        margin:20
    },
    error:{
        color:'red'
    }
});

export default RegisterScreen;