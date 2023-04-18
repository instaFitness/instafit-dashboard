import React from "react"
import { Input } from "@mui/material"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import generateThumbnail from "videojs-thumbnails"

const Upload = () => {
  const generateVideoThumbnail = async (videoURL) => {
    try {
      const thumbnailDataURL = await generateThumbnail(videoURL, {
        width: 320,
        height: 180,
      })
      return thumbnailDataURL
    } catch (error) {
      console.error("Error generating thumbnail:", error)
    }
    return null
  }
  const createFileEntry = async (fileData) => {
    try {
      const docRef = await addDoc(collection(firestore, "files"), fileData)
    } catch (error) {
      console.error("Error creating document:", error)
    }
  }
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.")
      return
    }

    try {
      setUploading(true)

      const storage = getStorage(firebaseApp)
      const storageRef = ref(storage, `uploads/${file.name}`)
      await uploadBytes(storageRef, file)

      const fileURL = await getDownloadURL(storageRef)

      // Generate video thumbnail
      const thumbnailURL = await generateVideoThumbnail(fileURL)

      // Store file metadata in Firestore
      await createFileEntry({
        name: file.name,
        url: fileURL,
        thumbnail: thumbnailURL,
        size: file.size,
        type: file.type,
      })

      alert("File uploaded successfully.")
    } catch (error) {
      console.error("File upload error:", error)
      alert("File upload failed.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Input
      type='file'
      onChange={handleUpload}
      inputProps={{ accept: "video/*" }}
    />
  )
}

export default Upload
