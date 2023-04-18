import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const respondCollectionRef = collection(database, "respond_plans")