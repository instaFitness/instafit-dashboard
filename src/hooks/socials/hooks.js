import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { socialCollectionRef } from "./constants"

export const GetSocialsLists = () => {
  const [socialList, setSocialsList] = useState([])

  useEffect(() => {
    const socialCollection = socialCollectionRef
    const que = query(socialCollection)
    const unsubscribe = onSnapshot(que, (snapshot) => {
      const fetchedSocials = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setSocialsList(fetchedSocials)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return {
    socials: socialList,
  }
}
