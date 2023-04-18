import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const usersCollectionRef = collection(database, "users")