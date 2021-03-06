<template>
  <div>
    <div class="menu"><span @click="doLogout">Logout</span></div>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <CalendarDateIndicator class="calendar-month-header-selected-month" />

        <CalendarDateSelector />
      </div>

      <ol class="days-grid list-group list-group list-group-flush">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
        />
      </ol>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarMonthDayItem from "./CalendarMonthDayItem";
import CalendarDateIndicator from "./CalendarDateIndicator";
import CalendarDateSelector from "./CalendarDateSelector";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarMonth",

  components: {
    CalendarMonthDayItem,
    CalendarDateIndicator,
    CalendarDateSelector,
  },

  computed: {
    ...mapState("events", ["selectedDate"]),

    days() {
      return [...this.currentMonthDays];
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    month() {
      return Number(this.selectedDate.format("M"));
    },

    year() {
      return Number(this.selectedDate.format("YYYY"));
    },

    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },

    currentMonthDays() {
      const days = [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        const date = dayjs(`${this.year}-${this.month}-${index + 1}`);
        return {
          date: date.format("YYYY-MM-DD"),
          isCurrentMonth: true,
        };
      });
      return days;
    },
  },

  methods: {
    async doLogout() {
      await this.$auth.logout();
      this.$router.push('/login');
      this.$store.commit(
        "alert/SET_INFO",
        "You have been logged out successfully"
      );
    },

    getWeekday(date) {
      return dayjs(date).weekday();
    },

    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },

    ...mapActions({
      getEvents: "events/fetch",
    }),
  },
  async mounted() {
    await this.getEvents();
  },
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.menu {
  text-align: right;
}
</style>
