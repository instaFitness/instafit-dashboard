import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const trainingsCollectionRef = collection(database, "trainings")