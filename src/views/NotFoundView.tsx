import { Link } from "react-router-dom"

const NotFoundView = () => {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-white">La página solicitada no fue encontrada</h1>
            <p className="mt-10 text-center text-white">Volver a {' '}
                <Link to={'/'} className="text-blue-500">Proyectos</Link>
            </p>
        </>
    )
}

export default NotFoundView