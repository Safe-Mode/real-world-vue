<template lang="html">
  <div>
    <h1>Event Listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import axios from 'axios'
import EventCard from '@/components/EventCard.vue'

export default {
  data() {
    return {
      events: []
    }
  },
  components: {
    EventCard
  },
  created() {
    axios
      .get('http://localhost:3000/events')
      .then(response => {
        this.events = response.data
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>

<style scoped></style>
