import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/api";
import { useAuth } from '@/hooks/useAuth';
import Loading from '../Loading';
import { isManager } from '@/utils/policies';
import DeleteProjectModal from '@/components/Projects/DeleteProjectModal';

export const DashboardView = () => {

  const navigate = useNavigate();
  const { data: user, isLoading: authLoading } = useAuth();
  // UseQuery para obtener datos del servidor
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading && authLoading) return <Loading />;

  if (data && user) return (
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

      {data.length ? (
        <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
          {data.map((project) => (
            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex flex-col space-y-2">
                  <div>
                    {isManager(project.manager, user._id) ?
                      <span className="px-2 text-center text-sm font-bold text-indigo-600 bg-indigo-100 border-2 border-indigo-600 rounded-md">Manager</span>
                      : <span className="px-2 text-center text-sm font-bold text-blue-600 bg-green-100 border-2 border-green-600 rounded-md">Colaborador</span>
                    }
                  </div>
                  <Link to={`/projects/${project._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{project.projectName}</Link>
                  <p className="text-sm text-gray-400">
                    Cliente: {project.clientName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </MenuButton>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <MenuItem>
                        <Link to={`/projects/${project._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 w-full text-left'>
                          Ver Proyecto
                        </Link>
                      </MenuItem>

                      {isManager(project.manager, user._id) && (
                        <>
                          <MenuItem>
                            <Link to={`/projects/${project._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100 w-full text-left'>
                              Editar Proyecto
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm leading-6 text-red-500 hover:bg-gray-100 w-full text-left'
                              onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                            >
                              Eliminar Proyecto
                            </button>
                          </MenuItem>

                        </>)
                      }

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No hay proyectos aún {''}
          <Link to='/projects/create' className='text-blue-500 font-bold'>Crear Proyecto</Link>
        </p>
      )}

      <DeleteProjectModal />
    </div>
  );
};
