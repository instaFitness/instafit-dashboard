import { useState, useEffect } from "react"
import { getStorage, listAll, ref } from "firebase/storage"

async function fetchItems(storageRef, prefix = "") {
  try {
    const res = await listAll(ref(storageRef, prefix))
    const itemsData = res.items.map((itemRef) => {
      return {
        name: itemRef.name,
        fullPath: itemRef.fullPath,
      }
    })

    // Recursively fetch items from subdirectories
    for (const folderRef of res.prefixes) {
      const nestedItems = await fetchItems(storageRef, folderRef.fullPath)
      itemsData.push(...nestedItems)
    }

    return itemsData
  } catch (error) {
    console.error("Error fetching items from Firebase Storage:", error)
    return []
  }
}

export const GetImageLists = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchImageItems = async () => {
      const storage = getStorage()
      const storageRef = ref(storage)

      fetchItems(storageRef).then((itemsData) => {
        setItems(itemsData)
      })
    }

    fetchImageItems()

    return () => {
      fetchImageItems()
    }
  }, [])

  return {
    imageList: items,
  }
}
