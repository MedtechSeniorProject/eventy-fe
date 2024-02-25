import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const AuthLayout = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <section className="flex flex-1 justify-center items-center flex-col p-32 2xl:p-48">
          <Outlet />
        </section>
        <img
          src="/illustration.svg"
          alt="logo"
          className="h-screen w-1/2 bg-no-repeat p-36 2xl:p-48"
        />
      </>
    );
  }

  return (
    <>
      {user?.isSuperAdmin ? (
        <Navigate to="/superadmin" replace />
      ) : (
        <Navigate to="/eventmanager" replace />
      )}
    </>
  );
};

export default AuthLayout;
