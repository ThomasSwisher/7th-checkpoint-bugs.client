import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNotes(newNotes) {
    const res = await api.post('/api/notes', newNotes)
    AppState.notes.push(res.data)
  }

  async getNotes(id) {
    const res = await api.get(`/api/bugs/${id}/notes`)
    AppState.notes = res.data
    console.log(res.data)
  }

  async deleteNotes(id) {
    await api.delete('/api/notes/' + id)
    AppState.notes = AppState.notes.filter(b => b.id !== id)
  }
}

export const notesService = new NotesService()
