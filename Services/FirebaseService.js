import { db } from "./FirebaseManager"

export const AddGeoCacheFirebase = (data) => {
    return new Promise((resolve) => {
        db.collection("GeoCache").add(data)
        .then(
            (doc) => {
                console.log(`Document saved: ${doc.id}`);
                resolve(true);
            }
        ).catch(
            (err) => {
                console.log(`Error saving item`);
                console.log(err);
                resolve(false);
            }
        )
    })
}

export const fetchCacheList = () => {
    return new Promise((resolve) => {
        let cacheArray = [];
        db.collection("GeoCache").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                cacheArray.push(doc.data());
            });
            resolve(cacheArray);
        });
    });
}

export const AddUser = (data) => {
    return new Promise((resolve) => {
        db.collection("user").add(data)
        .then(
            (doc) => {
            console.log("Document written with ID: ", doc.id);
            resolve(true);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            resolve(false);
        });
    })
}

export const GetUser = () => {
    return new Promise((resolve) => {
        let userArray = [];
        db.collection("user").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userArray.push(doc.data());
            });
            resolve(userArray);
        });
    });
}