export default ctx => {
  const { store, app } = ctx;
  const axios = app.$axios;
  axios.interceptors.response.use(async response => {
    store.commit('alert/SET_ERROR', null);
    return response;
  }, error => {
    const { response } = error;
    store.commit('alert/SET_ERROR', response.data);

    return Promise.reject(error);
  });

  axios.interceptors.request.use(request => {
    return request;
  }, error => {
    return Promise.reject(error);
  });
};
