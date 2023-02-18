import { UserModel } from '../model/user';

export interface UserRepository {
  list(): Promise<Array<UserModel>>;

  find(id: string): Promise<UserModel>;

  register(user: UserModel): Promise<UserModel>;
}
