import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { requestPlanCollectionRef } from "./constants"

export const GetRequestPlanList = () => {
  const [requestPlanList, setRequestPlanList] = useState([])

  useEffect(() => {
    const requestPlanCollection = requestPlanCollectionRef
    const que = query(requestPlanCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedRequestPlan = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setRequestPlanList(fetchedRequestPlan)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    request_plan: requestPlanList,
  }
}
