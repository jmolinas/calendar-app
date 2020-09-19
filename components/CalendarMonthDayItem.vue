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
    {{ events }}
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
    event: {
      type: Array,
    },
  },

  computed: {
    label() {
      return dayjs(this.day.date).format("D");
    },
    dayName() {
      return dayjs(this.day.date).format("ddd");
    },
    events: function () {
      const events = this.event.reduce((init, element) => {
        // console.log(element.attributes.date, dayjs(this.day.date).format("YYYY-MM-DD"))
        if (
          element.attributes.date == dayjs(this.day.date).format("YYYY-MM-DD")
        ) {

          return init.push(element);
        }
        return init;
      }, []);
      console.log(events)
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
