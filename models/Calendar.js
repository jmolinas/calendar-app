import Model from '~/api/src/Model';

export default class Calendar extends Model {
  baseURL() {
    return process.env.CALENDAR_API + '/api/v1';
  }

  // implement a default request method
  request(config) {
    return this.$http.request(config);
  }
}