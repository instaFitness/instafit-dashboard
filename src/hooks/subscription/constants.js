import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const subscriptionCollectionRef = collection(database, "subscriptions")