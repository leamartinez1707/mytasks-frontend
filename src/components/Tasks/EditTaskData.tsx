import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/taskApi"
import EditTaskModal from "./EditTaskModal"


const EditTaskData = () => {

    // Params para obtener el id del proyecto desde la url
    const params = useParams()
    const location = useLocation()
    // Query params para obtener el id de la tarea a editar desde la url, se obtiene con la key 'editTask'
    const queryParams = new URLSearchParams(location.search)
    const editTaskId = queryParams.get('editTask')

    console.log(editTaskId)

    const { data, isError } = useQuery({
        queryKey: ['task', editTaskId!],
        queryFn: () => getTaskById({ taskId: editTaskId!, projectId: params.projectId! }),
        enabled: !!editTaskId, // Convierte la variable en un booleano para ver si existe
        retry: false

    })
    console.log(isError)
    if (isError) return <Navigate to="/404" />
    if (data) return <EditTaskModal data={data} taskId={editTaskId!} />
}

export default EditTaskData