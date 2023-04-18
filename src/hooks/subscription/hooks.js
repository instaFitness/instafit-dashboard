import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { subscriptionCollectionRef } from "./constants"

export const GetSubscriptionsLists = () => {
  const [subscriptionList, setSubscritionList] = useState([])

  useEffect(() => {
    const subscriptionCollection = subscriptionCollectionRef
    const que = query(subscriptionCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedSubscription = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSubscritionList(fetchedSubscription)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    subscription_items: subscriptionList,
  }
}
