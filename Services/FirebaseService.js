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