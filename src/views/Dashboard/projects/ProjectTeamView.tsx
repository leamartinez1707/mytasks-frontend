import { Link, useNavigate, useParams } from 'react-router-dom'

const ProjectTeamView = () => {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    return (

        <>
            <h1 className="text-5xl font-black">Administrar equipo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para el proyecto</p>

            <nav className="my-5 flex gap-3">
                <button
                    className="bg-blue-400 hover:bg-blue-600 cursor-pointer px-10 py-3 text-white text-xl font-bold transition-colors duration-200"
                    onClick={(() => navigate(location.pathname + '?addMember=true'))}
                >
                    Agregar colaborador
                </button>
                <Link className="bg-cyan-400 hover:bg-cyan-600 cursor-pointer px-10 py-3 text-white text-xl font-bold transition-colors duration-200" to={`/projects/${projectId}`}>
                    Volver al proyecto</Link>
            </nav>
        </>
    )
}

export default ProjectTeamView