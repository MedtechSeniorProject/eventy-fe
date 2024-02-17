import { Route, Routes } from "react-router-dom"
import "./globals.css"
import AuthLayout from "./_auth/AuthLayout"
import Login from "./_auth/forms/login"
import Validation from "./_auth/forms/validation"

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            {/** public routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/validate" element={<Validation />} />
            </Route>
            {/** private routes */}
            
        </Routes>
    </main>
  )
}

export default App