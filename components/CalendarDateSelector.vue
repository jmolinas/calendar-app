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

  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions({
      getEvents: "events/fetch",
      prevDate: "events/prevDate",
      curDate: "events/currentDate",
      nextDate: "events/nextDate",
    }),
    async selectPrevious() {
      let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
      this.prevDate();
      await this.getEvents();
      this.$emit("dateSelected", newSelectedDate);
    },

    async selectCurrent() {
      let newSelectedDate = dayjs(this.currentDate);
      this.curDate();
      await this.getEvents();
      this.$emit("dateSelected", newSelectedDate);
    },

    async selectNext() {
      let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
      this.nextDate();
      await this.getEvents();
      this.$emit("dateSelected", newSelectedDate);
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
