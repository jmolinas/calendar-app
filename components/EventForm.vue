<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group class="input-holder">
      <b-form-input type="text" placeholder="Event title" v-model="event.title" />
    </b-form-group>
    <b-form-group class="input-holder">
      <b-form-datepicker :placeholder="'Start date'" v-model="event.start" :state="isValid" />
    </b-form-group>
    <b-form-group class="input-holder">
      <b-form-datepicker :placeholder="'End date'" v-model="event.end" :state="isValid" />
    </b-form-group>
    <b-form-group class="input-holder">
      <b-form-textarea placeholder="Event description" rows="4" v-model="event.description"></b-form-textarea>
    </b-form-group>
    <b-form-group id="schedule_days">
      <b-form-checkbox-group v-model="event.days" id="checkboxes-4">
        <b-form-checkbox v-for="(item, index) in dayNames" :key="index" :value="item">{{ item }}</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
    <b-button type="submit" variant="primary">Schedule</b-button>
  </b-form>
</template>
<script>
import calendar from "~/services/Calendar";
import Event from "~/models/Events";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import dayjs from "dayjs";

export default {
  name: "EventForm",
  data() {
    return {
      event: {
        title: "",
        start: "",
        end: "",
        description: "",
        days: [],
      },
    };
  },
  computed: {
    checkValid() {
      let start = new Date(this.event.start);
      start.setHours(0, 0, 0, 0);
      let end = new Date(this.event.end);
      end.setHours(0, 0, 0, 0);
      return end > start;
    },
    isValid() {
      if (this.event.start && this.event.end) {
        return this.checkValid;
      }
      return null;
    },
    dayNames() {
      return calendar.dayNames;
    },
  },
  methods: {
    ...mapMutations({
      error: "alert/SET_ERROR",
    }),
    ...mapActions({
      getEvents: "events/fetch",
    }),
    async handleSubmit() {
      const { title, description, start, end, days } = this.event;
      if (start && end) {
        if (this.checkValid === false) {
          this.SET_ERROR({ message: "Invalid Date Range" });
          return;
        }
      }
      try {
        const data = calendar.schedule(title, description, start, end, days);
        await new Event(data).save();
        await this.getEvents();
        this.error(null);
        this.resetValues();
      } catch (error) {
        console.log(error);
      }
    },
    selectColor(color) {
      this.event = {
        ...this.event,
        cssClass: color,
      };
    },
    resetValues() {
      this.event = {
        title: "",
        start: "",
        end: "",
        description: "",
        days: [],
      };
    },
  },
};
</script>