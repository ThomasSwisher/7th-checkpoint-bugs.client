<template>
  <div class="modal fade"
       id="new-bug-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New Bug Report
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createBug">
          <div class="modal-body">
            <div class="form-group">
              <label for="make">Name</label>
              <input type="text"
                     class="form-control"
                     id="name"
                     placeholder="Name..."
                     v-model="state.newBug.name"
                     required
              >
            </div>
            <div class="form-group">
              <label for="model">Comment</label>
              <input type="text"
                     class="form-control"
                     id="Comment"
                     placeholder="Your Comment Here..."
                     v-model="state.newBug.comment"
                     required
              >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import { bugsService } from '../services/BugsService'
import $ from 'jquery'
export default {
  name: 'Component',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          // await bugsService.createBug(state.newBug)
          // NOTE reseting to the empty object resets the input fields
          state.newBug = {}
          // REVIEW CLOSING THE MODAL
          // eslint-disable-next-line no-undef
          $('#new-bug-form').modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
