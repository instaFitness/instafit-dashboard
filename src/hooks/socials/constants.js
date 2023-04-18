import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const socialCollectionRef = collection(database, "social")