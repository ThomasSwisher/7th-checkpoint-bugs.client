import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async createBug(newBug) {
    const res = await api.post('/api/bugs', newBug)
    AppState.bugs.push(res.data)
  }

  async getBugs() {
    const res = await api.get('/api/bugs')
    AppState.bugs = res.data
    console.log(res.data)
  }

  async deleteBug(id) {
    await api.delete('/api/bugs/' + id)
    AppState.bugs = AppState.bugs.filter(b => b.id !== id)
  }
}

export const bugsService = new BugsService()
