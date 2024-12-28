import { useForm } from "react-hook-form"
import { NoteFormData } from "@/types/index"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/noteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

const AddNoteForm = () => {

    const params = useParams()

    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast(data)
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({ formData, projectId, taskId })
        reset()
    }
    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear nota</label>
                <input id="content" type="text" placeholder="Contenido de la nota" className="w-full p-3 border border-gray-300"
                    {...register('content', { required: 'Este campo es requerido' })}
                />
                {errors.content && (<ErrorMessage>{errors.content.message} </ErrorMessage>)}
            </div>

            <input type="submit" className="bg-gray-600 hover:bg-gray-700 w-full p-2 text-white font-black cursor-pointer" />
        </form>
    )
}

export default AddNoteForm