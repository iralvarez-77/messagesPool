import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/users/:id" element={<h1>UserByID</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App