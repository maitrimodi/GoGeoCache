import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAsyncData = (data) => {
    getUser().then((dataStore)=> {
        AsyncStorage.setItem(dataStore, JSON.stringify(data))
        .then(
          // callback functions
          // if .setItem succeeds? ==> the data was correctly stored to the storage
          () => {
            console.log("["+dataStore+"] Save was successful.");
          }
        ).catch(
          (error) => {
            console.log("Error occurred when saving a primitive");
            console.log(error);
          }
        );
    });
}

export const setUser = (user) => {
    AsyncStorage.setItem("user", user)
    .then(
      // callback functions
      // if .setItem succeeds? ==> the data was correctly stored to the storage
      () => {
        console.log("[User] Save was successful.");
      }
    ).catch(
      (error) => {
        console.log("Error occurred when saving a primitive");
        console.log(error);
      }
    );
}

export const getAsyncData = () => {
    return new Promise((resolve) => {
    getUser().then((dataStore)=> {
        AsyncStorage.getItem(dataStore)
        .then(
          //callback function
          (dataFromStorage) => {
            if(dataFromStorage === null){
              console.log("Could not find data for key = friends");
              resolve(false)
            }
            else {
              console.log(("We found value under key = friends"));
              // data from storage = return a string
              console.log(dataFromStorage);
              // convert it back to an object / array
              const convertedData = JSON.parse(dataFromStorage);
              resolve(convertedData)
              console.log(convertedData);
            }
          }
        ).catch(
          (error) => {
            console.log("Error when fetching primitive from key-value storage");
            console.log(error);
            resolve(false)
          }  
        )  
        })
    })
}

export const getUser = (user) => {
    return new Promise((resolve) => {
        AsyncStorage.getItem("user")
        .then(
          //callback function
          (dataFromStorage) => {
            if(user === null){
              console.log("Could not find data for key = user");
              resolve("")
            }
            else {
              console.log(("We found value under key = user"));
              // data from storage = return a string
              console.log(dataFromStorage);
              resolve(dataFromStorage);
            }
          }
        ).catch(
          (error) => {
            console.log("Error when fetching primitive from key-value storage");
            console.log(error);
            resolve(false)
          }  
        )
    })
}