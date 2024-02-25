import { Route, Routes } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/login";
import Validation from "./_auth/forms/validation";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./dashboard";
import { AuthProvider } from "./_auth/context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { QueryProvider } from "./lib/QueryProvider";

const App = () => {
  return (
    <>
        <main className="flex h-screen">
          <QueryProvider>
          <AuthProvider>
            <Routes>
              {/** public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/validate" element={<Validation />} />
              </Route>
              {/** private routes */}
              <Route element={<RequireAuth role="SUPERADMIN" />}>
                <Route path="/superadmin" element={<Dashboard />} />
              </Route>
              <Route element={<RequireAuth role="EVENTMANAGER" />}>
                <Route path="/eventmanager" element={<Dashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
          </QueryProvider>
        </main>
        <Toaster />
        </>
  );
};

export default App;
