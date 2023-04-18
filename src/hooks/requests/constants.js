import { collection } from "firebase/firestore"
import { database } from "../../firebase/firebase"

export const requestPlanCollectionRef = collection(database, "request_plan")