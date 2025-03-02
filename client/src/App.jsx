import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"
import UsersPage from "./pages/UsersPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />

          <Route element={<ProtectedRoute/>} >
            <Route path="/users/:id" element={<UserPage/>} />
            <Route path="/users" element={<UsersPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App