import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';
import { toast } from 'react-toastify';
import { createTask } from '@/api/taskApi';

export default function AddTaskModal() {

    // Leer si modal existe
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get('newTask');
    const show = modalTask ? true : false;

    // Obtener id del proyecto
    const params = useParams();
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: '',
        description: '',
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
            toast.success(data);
            reset()
            navigate(location.pathname, {
                replace: true
            })
        }

    })


    const handleCreateTask = async (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data);
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {
                    replace: true
                })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        noValidate
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm register={register} errors={errors} />

                                        <input type="submit" value="Guardar tarea" className="bg-cyan-600 hover:bg-cyan-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors duration-200" />
                                    </form>
                                </Dialog.Panel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}