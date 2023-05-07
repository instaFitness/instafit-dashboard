import { useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  getAuth,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { useNavigate } from "react-router-dom"

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(() =>
    window.localStorage.getItem("access_token")
  )
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser)
      if (authUser) {
        const token = await authUser.getIdToken()
        window.localStorage.setItem("access_token", token)
        setAccessToken(token)
      } else {
        window.localStorage.removeItem("access_token")
        setAccessToken(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const register = async (email, password) => {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const token = await response.user.getIdToken()
      window.localStorage.setItem("access_token", token)
      setAccessToken(token)
      setLoading(false)
      setUser(response.user)
    } catch (error) {
      setLoading(false)
      console.error("Error registering user:", error)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const token = await response.user.getIdToken()
      setAccessToken(token)
      setLoading(false)
      setUser(response.user)
    } catch (error) {
      setLoading(false)
      console.error("Error logging in:", error)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setAccessToken(null)
      setLoading(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error("Error logging out:", error)
    }
  }

  const reauthenticateUser = async (email, password) => {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      console.error('Error re-authenticating user:', error);
    }
  };

  const updateCreds = async (email, password, name) => {
    const auth = getAuth();
    try {
      await reauthenticateUser(email, password);
      await updateEmail(auth.currentUser, email)
      await updatePassword(auth.currentUser, password)
      await updateProfile(auth.currentUser, {
        displayName: name,
      })
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return { user, accessToken, login, logout, register, loading, updateCreds }
}

export default useAuth
