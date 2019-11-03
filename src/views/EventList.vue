<template lang="html">
  <div>
    <h1>Event for {{ user.name }}</h1>

    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page
      </router-link>
      <template v-if="hasNextPage">
        |
      </template>
    </template>

    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user'])
  },
  created() {
    this.perPage = 3

    this.fetchEvents({
      perPage: this.perPage,
      page: this.page
    })
  },
  methods: mapActions('event', ['fetchEvents'])
}
</script>

<style scoped></style>
