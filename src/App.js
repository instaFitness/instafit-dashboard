import useAuth from "./hooks/auth/useAuth"
import AuthContext from "./utils/AuthContext"
import Admin from "./pages/Admin"
import LoadingComponent from "./components/Loading"
import LoginComponent from "./pages/auth/Login"
import ForgotPasswordComponent from './pages/auth/ForgotPassword'
import { Route, Routes } from "react-router-dom"

function App() {
  const { user, accessToken, login, logout, register, loading, updateCreds } =
    useAuth()

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, register, updateCreds }}
    >
      {accessToken === null ? (
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        </Routes>
      ) : (
        <Admin />
      )}
    </AuthContext.Provider>
  )
}

export default App
