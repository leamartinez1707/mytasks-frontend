import type { Task } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"

type NotePanelProps = {
    notes: Task['notes']
}

const NotesPanel = ({ notes }: NotePanelProps) => {

    console.log(notes)
    return (
        <div>
            <h1 className="text-2xl my-2">Panel de notas</h1>
            <AddNoteForm />
            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
                        {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                    </>
                )
                    :
                    <p className="text-gray-500 text-center pt-3">No hay notas</p>
                }
            </div>
        </div >
    )
}

export default NotesPanel