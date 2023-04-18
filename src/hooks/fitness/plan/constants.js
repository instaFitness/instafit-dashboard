import { collection } from "firebase/firestore"
import { database } from "../../../firebase/firebase"

export const fitnessPlanCollectionRef = collection(database, "fitness-plan")