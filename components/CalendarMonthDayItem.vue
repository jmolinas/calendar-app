<template>
  <li
    class="calendar-day list-group-item"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday,
      'list-group-item-success': events.length > 0,
    }"
  >
    <span>{{ label }} {{ dayName }}</span>
    <ul v-if="events.length > 0" id="schedule_days">
      <li v-for="(item, index) in events" :key="index">{{ item.relationships.event.title }}</li>
    </ul>
  </li>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "CalendarMonthDayItem",

  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    },
    dayName() {
      return dayjs(this.day.date).format("ddd");
    },
    ...mapState("events", ["dates"]),
    events: function () {
      const events = this.dates.reduce((init, element) => {
        // console.log(element.attributes.date, dayjs(this.day.date).format("YYYY-MM-DD"))
        if (
          element.attributes.date == dayjs(this.day.date).format("YYYY-MM-DD")
        ) {
          init.push(element);
        }
        return init;
      }, []);
      return events;
    },
  },
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  padding: 10px;
}

.calendar-day > span {
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
  padding: 5px;
}
</style>
