import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { mealTypeCollectionRef } from "./constants"

export const GetMealTypeLists = () => {
  const [mealTypes, setMealTypes] = useState([])

  useEffect(() => {
    const mealTypeCollection = mealTypeCollectionRef
    const que = query(mealTypeCollection)
    const unsubscribe = onSnapshot(
      que,(snapshot) => {
        const fetchedType = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMealTypes(fetchedType)
      } 
    )
    return () => {
      unsubscribe();
    };
  }, [])

  return {
    mealType: mealTypes
  }
}
