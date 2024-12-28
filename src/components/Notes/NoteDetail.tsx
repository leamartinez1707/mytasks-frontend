import { deleteNote } from "@/api/noteApi"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import Loading from "@/views/Loading"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}
const NoteDetail = ({ note }: NoteDetailProps) => {

    const { data, isLoading } = useAuth()



    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const params = useParams()

    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    const handleDelete = () => {
        mutate({ projectId, taskId, noteId: note._id })
    }

    if (isLoading) return <Loading />
    if (data) return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-600">
                    {formatDate(note.createdAt)}
                </p>

            </div>
            {canDelete &&
                <button
                    onClick={handleDelete}
                    type="button"
                    className="hover:bg-red-500 bg-red-400 p-2 text-xs text-white font-bold transition-colors">Eliminar</button>
            }
        </div>

    )
}

export default NoteDetail