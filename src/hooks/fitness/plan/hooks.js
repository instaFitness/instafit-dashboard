import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { fitnessPlanCollectionRef } from "./constants"

export const GetFitnessPlanLists = () => {
  const [plansList, setPlansList] = useState([])

  useEffect(() => {
    const fitnessPlanCollection = fitnessPlanCollectionRef
    const que = query(fitnessPlanCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedPlans = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setPlansList(fetchedPlans)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    plans: plansList,
  }
}
