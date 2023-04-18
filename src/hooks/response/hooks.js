import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { respondCollectionRef } from "./constants"

export const GetRespondList = () => {
  const [respondPlanList, setRespondList] = useState([])

  useEffect(() => {
    const respondCollection = respondCollectionRef
    const que = query(respondCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedRespond = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setRespondList(fetchedRespond)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    resPlanList: respondPlanList
  }
}
