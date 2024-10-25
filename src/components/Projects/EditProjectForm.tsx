import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Project, ProjectFormData } from "@/types/index";
import ProjectForm from "./ProjectForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/api";
import { toast } from "react-toastify";


type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {


    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            projectName: data.projectName,
            clientName: data.clientName,
            description: data.description
        }
    });

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
            toast.success('Proyecto actualizado correctamente')
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }


    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Llenar formulario para editar el proyecto
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

                <input value={'Guardar Proyecto'} type="submit" className="bg-cyan-600 hover:bg-cyan-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-200" />

            </form>
        </div>
    );
};

export default EditProjectForm