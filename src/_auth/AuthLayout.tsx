import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";

const AuthLayout = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <section className="flex flex-1	 justify-center flex-col p-32 ">
          <img className="absolute top-0 left-0 w-48 md:w-auto" src="/assets/topLeft.png" alt="image"/>
          <img className="absolute top-0 right-0 w-48 md:w-auto" src="/assets/topRight.png" alt="image"/>
          <img className="absolute bottom-0 right-0 w-48 md:w-auto" src="/assets/bottomRight.png" alt="image"/>
          <img className="absolute bottom-0 left-0 w-48 md:w-auto" src="/assets/bottomLeft.png" alt="image"/>
          <Outlet />
        </section>
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
