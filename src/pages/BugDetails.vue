<template>
  <div class="container-fluid">
    <div class="row flex-direction-column">
      <div v-for="n in state.notes" :key="n.id" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'

export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: {},
      notes: computed(() => AppState.notes)
    })
    onMounted(async() => {
      try {
        await notesService.getNotes(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      async createList() {
        state.newList.boardId = route.params.id
        // await bugsService.createList(state.newList)
        state.newList = {}
      },
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.cust-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
}

.btn-success {
  width: 90px;
  margin-left: 20px;
}

label {
  margin-right: 20px;
}

.form-group {
  max-width: 460px;

}
</style>
