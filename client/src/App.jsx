import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"
import UsersPage from "./pages/UsersPage"
import MessageFormPage from "./pages/MessageFormPage"
import ProtectedRoute from "./ProtectedRoute"
import MessageProvider from "./context/MessageContext"

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />

            <Route element={<ProtectedRoute/>} >
              <Route path="/users/:id" element={<UserPage/>} />
              <Route path="/users" element={<UsersPage/>} />
              <Route path="/messages" element={<MessageFormPage/>} />
            </Route>  
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  )
}

export default App