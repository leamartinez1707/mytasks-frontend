
const AddNoteForm = () => {
    return (
        <form
            onSubmit={() => { }}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear nota</label>
                <input id="content" type="text" placeholder="Contenido de la nota" className="w-full p-3 border border-gray-300" />
            </div>

            <input type="submit" className="bg-gray-600 hover:bg-gray-700 w-full p-2 text-white font-black cursor-pointer" />
        </form>
    )
}

export default AddNoteForm