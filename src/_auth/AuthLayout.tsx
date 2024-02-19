import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/login" />
      ) : (
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
      )}
    </>
  );
};

export default AuthLayout;
