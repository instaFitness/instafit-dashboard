import { collection } from "firebase/firestore"
import { database } from "../../../firebase/firebase"

export const mealPlanCollectionRef = collection(database, "meal-plan")