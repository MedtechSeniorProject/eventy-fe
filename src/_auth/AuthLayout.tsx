import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col">
            <Outlet />
          </section>
          <img
            src="/illustration.svg"
            alt="logo"
            className="h-screen w-1/2 bg-no-repeat p-36"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
