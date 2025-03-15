import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import UserPage from "./pages/UserPage"
import MessagesPage from "./pages/MessagesPage"
import MessageFormPage from "./pages/MessageFormPage"
import ProtectedRoute from "./ProtectedRoute"
import MessageProvider from "./context/MessageContext"
import Navbar from "./components/navbar"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />

            <Route element={<ProtectedRoute/>} >
              <Route path="/users/:id" element={<UserPage/>} />
              <Route path="/users" element={<MessagesPage/>} />
              <Route path="/messages" element={<MessageFormPage/>} />
            </Route>  
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  )
}

export default App