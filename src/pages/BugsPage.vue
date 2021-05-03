<template>
  <div class="container-fluid">
    <div class="bug container">
      <div class="row">
        <div class="col d-flex justify-content-end py-3">
          <button title="Open Create Bug Form"
                  type="button"
                  class=""
                  data-toggle="modal"
                  data-target="#new-bug-form"
          >
            <h4>REPORT</h4>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <h3>Title</h3>
      </div>
      <div class="col-3">
        <h3>Reported By</h3>
      </div>
      <div class="col-3">
        <h3>
          Status
        </h3>
      </div>
      <div class="col-3">
        <h3>Last Modified</h3>
      </div>
    </div>
    <div class="color" v-for="bug in state.bugs" :key="bug.id">
      <div :to="{name: 'BugDetails', params: {id: bug.id}}">
        <div class="row">
          <div class="col-3">
            {{ bug.title }}
          </div>
          <div class="col-3">
            {{ bug.creator.name }}
          </div>
          <div class="col-3">
            <span v-if="bug.closed" class="closed">
              CLOSED
            </span>
            <span v-else class="open">OPEN</span>
          </div>
          <div class="col-3">
            {{ new Date (bug.updatedAt).toLocaleString(en, time) }}
          <!-- <button @click="deleteBug(bug.id)" class="btn custom-btn btn-danger delete">
                Delete
              </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'Bugs',
  setup() {
    const state = reactive({
      newbug: {},
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        console.error(error)
      }
    })

    return {
      async createBug() {
        await bugsService.createBug(state.newBug)
        state.newbug = {}
      },
      state,
      async deleteBug(id) {
        try {
          if (await Notification.confirmAction()) {
            await bugsService.deleteBug(id)
            Notification.toast('Confirm what choice they made.', 'success')
          } else {
            Notification.toast('Confirm what choice they made.', 'success')
          }
        } catch (error) {
          console.error(error)
        }
      },
      time: {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }

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
.delete {
  cursor: pointer;
}

label {
  margin-right: 20px;
}

.btn-success {
  width: 125px;
  margin-left: 20px;
}

a {
 color: #0087ce;
}

.custom-btn  {
  padding: 0px 5px 0px 5px;
  margin-left: 15px;
}

.custom {
  margin-bottom: 10px;
}

.color:nth-child(even) {background: rgb(255, 253, 253)}
.color:nth-child(odd) {background: rgba(210, 210, 210, 0.399)}

.closed {
color: red;
font-weight: 900;
  }

.open {
    color: green;
    font-weight: 900;
  }

.container-fluid {
      background: white;
}

button {
      padding-top: 12px;
    background: black;
    color: white;
}

</style>
