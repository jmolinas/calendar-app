export const state = () => ({
  info: null,
  error: null,
  code: 200
});

export const mutations = {
  SET_INFO(state, message) {
    state.error = null;
    state.code = 200;
    state.info = message;
  },
  SET_ERROR(state, payload) {
    if (payload === null) {
      state.error = null;
      state.info = null;
      return;
    }
    const { status } = payload;
    state.code = status;
    state.info = null;
    switch (status) {
      case 422:
        const errors = ('errors' in payload) ?  Object.values(payload.errors).flat() : payload.description;
        state.error = errors;
        break;
      case 403:
      case 401:
      case 404:
        state.error = `${status}: ${payload.description}`;
        break;
      default:
        state.error = ('message' in payload) ? payload.message : payload.description;
    }
  }
};

export const getters = {
  info(state) {
    return state.info;
  },
  error(state) {
    return state.error;
  },
  code(state) {
    return state.code;
  }
};