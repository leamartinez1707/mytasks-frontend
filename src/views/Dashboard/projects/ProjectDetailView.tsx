import { getProjectById } from "@/api/api"
import AddTaskModal from "@/components/Tasks/AddTaskModal"
import EditTaskData from "@/components/Tasks/EditTaskData"
import TaskList from "@/components/Tasks/TaskList"
import TaskModalDetail from "@/components/Tasks/TaskModalDetail"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"

const ProjectDetailView = () => {


    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId! // El valor nunca va a ser nulo

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <Navigate to="/404" />
    if (data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button
                    className="bg-blue-400 hover:bg-blue-600 cursor-pointer px-10 py-3 text-white text-xl font-bold transition-colors duration-200"
                    onClick={(() => navigate(location.pathname + '?newTask=true'))}
                >
                    Agregar tarea
                </button>

            </nav>

            <TaskList tasks={data.tasks} />

            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetail />
        </>
    )

}

export default ProjectDetailView