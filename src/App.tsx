import { Route, Routes } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/login";
import Validation from "./_auth/forms/validation";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <html lang="en">
      <head />
      <body>
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
        <Toaster />
      </body>
    </html>
  );
};

export default App;
