import { Route, Routes, Navigate } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/login";
import Validation from "./_auth/forms/validation";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./_auth/context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { QueryProvider } from "./lib/QueryProvider";
import NavLayoutSuperAdmin from "./pages/superadmin/NavLayoutSuperAdmin";
import NavLayoutEventManager from "./pages/eventmanager/NavLayoutEventManager";
import SaSettings from "./pages/superadmin/settings";
import SaStatistics from "./pages/superadmin/statistics";
import EmStatistics from "./pages/eventmanager/statistics";
import EmSettings from "./pages/eventmanager/settings";
import Events from "./pages/eventmanager/events";
import EventManagers from "./pages/superadmin/eventmanagers";
import EventGuestList from "./pages/eventmanager/event/guestlist";

const App = () => {
  return (
    <>
      <main className="flex h-screen">
        <QueryProvider>
          <AuthProvider>
            <Routes>
              {/** public routes */}
              <Route element={<AuthLayout />}>
                 {/** Redirect to /login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/validate" element={<Validation />} />
              </Route>
              {/** private routes */}
              <Route element={<RequireAuth role="SUPERADMIN" />}>
                <Route element={<NavLayoutSuperAdmin />} >
                  <Route path="/eventmanagers" element={<EventManagers />} />
                  <Route path="/sastatistics" element={<SaStatistics />} />
                  <Route path="/sasettings" element={<SaSettings />} />
                </Route>
              </Route>
              <Route element={<RequireAuth role="EVENTMANAGER" />}>
                <Route element={<NavLayoutEventManager />} >
                  <Route path="/events" element={<Events />} />
                  <Route path="/emstatistics" element={<EmStatistics />} />
                  <Route path="/emsettings" element={<EmSettings />} />
                  <Route path="/event/:id/guestlist" element={<EventGuestList />} />
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
