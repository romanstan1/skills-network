import firebase from "firebase/app"
import config from "./config"
import "firebase/auth"
import "firebase/firestore"

firebase.initializeApp(config)

const auth = firebase.auth()
const persistence = firebase.auth.Auth.Persistence
// const secondaryAuth = firebase.initializeApp(config, "Secondary").auth()
const firestore = firebase.firestore()
const {arrayRemove, arrayUnion} = firebase.firestore.FieldValue
// const settings = {timestampsInSnapshots: true}

// firestore.settings(settings)
firestore.enablePersistence({experimentalTabSynchronization: true})

export {auth, persistence, firestore, arrayUnion, arrayRemove}
