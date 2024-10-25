import { getProjectById } from "@/api/api"
import EditProjectForm from "@/components/Projects/EditProjectForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

const EditProjectView = () => {

    const params = useParams()
    const projectId = params.projectId! // El valor nunca va a ser nulo

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <Navigate to="/" />
    if (data) return <EditProjectForm data={data} projectId={projectId} />

}

export default EditProjectView