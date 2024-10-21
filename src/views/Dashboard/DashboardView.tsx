import { Link } from "react-router-dom";

export const DashboardView = () => {
  return (
    <div>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Administrar proyectos
      </p>

      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitio-colors"
        >
          Crear Proyecto
        </Link>
      </nav>
    </div>
  );
};
