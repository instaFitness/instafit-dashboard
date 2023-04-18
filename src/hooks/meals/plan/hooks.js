import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { mealPlanCollectionRef } from "./constants"

export const GetMealPlanLists = () => {
  const [mealPlans, setMealPlans] = useState([])

  useEffect(() => {
    const mealTypeCollection = mealPlanCollectionRef
    const que = query(mealTypeCollection)
    const unsubscribe = onSnapshot(
      que,(snapshot) => {
        const fetchedPlan = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMealPlans(fetchedPlan)
      } 
    )
    return () => {
      unsubscribe();
    };
  }, [])

  return {
    mealPlan: mealPlans,
  }
}


