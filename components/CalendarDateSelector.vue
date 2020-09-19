<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious"><</span>
    <span @click="selectCurrent">Today</span>
    <span @click="selectNext">></span>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "CalendarModeSelector",

  methods: {
    ...mapActions({
      getEvents: "events/fetch",
      prevDate: "events/prevDate",
      curDate: "events/currentDate",
      nextDate: "events/nextDate",
    }),
    async selectPrevious() {
      this.prevDate();
      await this.getEvents();
    },

    async selectCurrent() {
      this.curDate();
      await this.getEvents();
    },

    async selectNext() {
      this.nextDate();
      await this.getEvents();
    },
  },
};
</script>

<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>
