<template lang="html">
  <div>
    <h1>Event Listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page
      </router-link>
    </template>

    <template v-if="eventsTotal > page * perPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from '@/components/EventCard.vue'

const PER_PAGE = 3

export default {
  data() {
    return {
      perPage: PER_PAGE
    }
  },
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['events', 'eventsTotal'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  }
}
</script>

<style scoped></style>
