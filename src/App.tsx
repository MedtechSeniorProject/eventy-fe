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
import NavLayoutSuperAdmin from "./pages/superadmin/NavLayoutSuperAdmin";
import NavLayoutEventManager from "./pages/eventmanager/NavLayoutEventManager";
import Statistics from "./pages/superadmin/statistics";

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
                <Route element={<NavLayoutSuperAdmin />} >
                  <Route path="/eventmanagers" element={<Dashboard />} />
                  <Route path="/sastatistics" element={<Statistics />} />
                </Route>
              </Route>
              <Route element={<RequireAuth role="EVENTMANAGER" />}>
                <Route element={<NavLayoutEventManager />} >
                  <Route path="/events" element={<Dashboard />} />
                </Route>
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
