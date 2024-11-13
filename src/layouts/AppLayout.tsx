import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "@/components/Logo/Logo";
import NavMenu from "@/components/NavMenu/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/views/Loading";

export const AppLayout = () => {


  const { data, isError, isLoading } = useAuth();
  if (isLoading) return <Loading />
  if (isError) return <Navigate to='/auth/login' />
  if (data) return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <NavMenu data={data} />
        </div>
      </header>

      <div className="min-h-lvh max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </div>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados &copy; {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};
