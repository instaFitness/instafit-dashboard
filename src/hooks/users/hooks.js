import { useState, useEffect } from "react"
import { onSnapshot, query } from "firebase/firestore"
import { usersCollectionRef } from "./constants"

export const useGetUserLists = () => {
  const [usersList, setUserList] = useState([])

  useEffect(() => {
    const userCollection = usersCollectionRef
    const que = query(userCollection)
    const unsubscribe = onSnapshot(
      que,(snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserList(fetchedUsers)
      } 
    )
    return () => {
      unsubscribe();
    };
  }, [])

  return {
    users: usersList,
  }
}
