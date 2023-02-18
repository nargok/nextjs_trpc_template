import { UserModel } from '../model/user';

export interface UserRepository {
  list(): Promise<Array<UserModel>>;

  register(user: UserModel): Promise<UserModel>;
}
