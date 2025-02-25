import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import UserPage from "./pages/UserPage"
import UsersPage from "./pages/UsersPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/users/:id" element={<UserPage/>} />
          <Route path="/users" element={<UsersPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App