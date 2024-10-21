import { Link } from "react-router-dom";

const CreateProjectsView = () => {
  return (
    <div>
      <h1 className="text-5xl font-black">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llenar formulario para crear un nuevo proyecto
      </p>

      <nav className="my-5">
        <Link
          to="/"
          className="bg-blue-400 hover:bg-blue-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitio-colors"
        >
          Volver a proyectos
        </Link>
      </nav>
    </div>
  );
};

export default CreateProjectsView;
