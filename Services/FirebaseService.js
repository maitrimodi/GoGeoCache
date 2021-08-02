import { db } from "./FirebaseManager"

export const AddGeoCacheFirebase = (data) => {
    return new Promise((resolve) => {
        db.collection("GeoCache").add(data)
        .then(
            (doc) => {
                console.log(`Document saved: ${doc.id}`)
                resolve(true)
            }
        ).catch(
            (err) => {
                console.log(`Error saving item`)
                console.log(err)
                resolve(false)
            }
        )
    })
}

export const fetchCacheList = () => {
    return new Promise((resolve) => {
        let cacheArray = []
        db.collection("GeoCache").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                cacheArray.push(doc.data());
            });
            resolve(cacheArray);
        });
    });
}