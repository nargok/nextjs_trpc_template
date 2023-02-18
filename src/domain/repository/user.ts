import { UserListResponse } from '@/form/user';
import { UserModel } from '../model/user';

export interface UserRepository {
  list(): Promise<UserListResponse>;

  find(id: string): Promise<UserModel>;

  register(user: UserModel): Promise<UserModel>;
}
