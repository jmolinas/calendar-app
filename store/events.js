import dayjs from "dayjs";
import Event from "~/models/Events";

export const state = () => ({
  selectedDate: dayjs(),
  dates: []
});

export const mutations = {
  SET_DATE(state, date) {
    state.selectedDate = dayjs(date);
  },
  SET_COLLECTION(state, data) {
    state.dates = data;
  },
};

export const actions = {
  async fetch({ commit, state }) {
    try {
      let filter = {};
      const dateRange = state.selectedDate;
      const greater_equal = dateRange.startOf("month").format("YYYY-MM-DD");
      const less_equal = dateRange.endOf("month").format("YYYY-MM-DD");
      filter["date"] = { greater_equal, less_equal };
      const data = await Event.params({ filter }).get();
      commit('SET_COLLECTION', data);
    } catch (error) {

    }
  }
};

export const getters = {
  getEvents(state) {
    return state.dates;
  }
};
