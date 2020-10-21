import Model from '~/api/src/Model';

export default class User extends Model {
  resource() {
    return 'api/v1/users';
  }

  static me() {
    let self = this.instance();
    self.custom('api/v1/user');

    return self.get();
  }
}
