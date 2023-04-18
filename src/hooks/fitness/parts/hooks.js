import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { bodyPartsCollectionRef } from "./constants"

export const GetBodyPartsLists = () => {
  const [bodyPartsList, setBodyPartsList] = useState([])

  useEffect(() => {
    const bodyPartCollection = bodyPartsCollectionRef
    const que = query(bodyPartCollection)
    const unsubscribe = onSnapshot(
      que,(snapshot) => {
        const fetchedParts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBodyPartsList(fetchedParts)
      } 
    )
    return () => {
      unsubscribe();
    };
  }, [])

  return {
    bodyParts: bodyPartsList,
  }
}
