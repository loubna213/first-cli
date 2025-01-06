import { insertNote, saveDB, getDB } from "./db.js";

export const getAllNotes = async () => {
    const db = await getDB()
    return db.notes;
}

export const NewNote = async (note, tags) => {
    const newNote = {
        tags,
        content: note,
        id: Date.now()
    }
    await insertNote(newNote)
    return newNote;
}

export const findeNote = async (filter) => {
    const notes = await getAllNotes()
    return notes.filter(note => note.content.toLowerCase().includes(filter.toLowerCase()));
}

export const removeNote = async (id) => {
    const notes = await getAllNotes()
    const match = notes.find(note => note.id === id)

    if(match) {
        const newNotes = notes.filter(note => note.id !== id)
        await saveDB({ notes: newNotes })
        return id;
    }
}

export const removeAllNotes = () => saveDB({ notes: [] })