<template>
  <div>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>

      <BaseInput
        class="field"
        label="title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
      />

      <BaseInput
        class="field"
        label="description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        class="field"
        label="location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton type="submit" class="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  data() {
    const times = []

    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories
    }
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      NProgress.start()

      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })

          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
