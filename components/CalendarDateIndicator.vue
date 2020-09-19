<template>
  <div class="calendar-date-indicator">{{ selectedMonth }}</div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  computed: {
    selectedMonth() {
      return this.selectedDate.format("MMMM YYYY");
    },
    ...mapState('events', ['selectedDate']),
  },
};
</script>

<style scoped>
.calendar-date-indicator {
  font-size: 24px;
  font-weight: 600;
  color: var(--grey-00);
}
</style>

