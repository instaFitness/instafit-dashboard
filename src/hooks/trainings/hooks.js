import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { trainingsCollectionRef } from "./constants"

export const GetTrainingPlanLists = () => {
  const [trainingList, setTrainingList] = useState([])

  useEffect(() => {
    const trainingPlanCollection = trainingsCollectionRef
    const que = query(trainingPlanCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedTraining = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTrainingList(fetchedTraining)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    trainings: trainingList,
  }
}
