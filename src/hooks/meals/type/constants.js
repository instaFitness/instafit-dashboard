import { collection } from "firebase/firestore"
import { database } from "../../../firebase/firebase"

export const mealTypeCollectionRef = collection(database, "meal-types")