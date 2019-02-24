<template lang="html">
  <div>
    <h1>Event Listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
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
    EventService.getEvents()
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
