import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import ProjectForm from "@/components/Projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/api";


const CreateProjectsView = () => {

  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })
  const handleForm = (data: ProjectFormData) => {
    mutate(data)
  }


  return (
    <div className="max-w-3xl mx-auto">
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

      <form onSubmit={handleSubmit(handleForm)} noValidate className="mt-10 bg-white shadow-lg p-10 rounded-lg">

        <ProjectForm errors={errors} register={register} />
        <input type="submit" className="bg-cyan-600 hover:bg-cyan-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-200" />

      </form>
    </div>
  );
};

export default CreateProjectsView;
