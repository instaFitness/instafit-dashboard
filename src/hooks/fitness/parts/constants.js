import { collection } from "firebase/firestore"
import { database } from "../../../firebase/firebase"

export const bodyPartsCollectionRef = collection(database, "target-body")