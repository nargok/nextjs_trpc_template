import { UserModel } from '@/domain/model/user';

export class UserListResponse {
  constructor(readonly userList: UserModel[]) {}

  static create(users: UserModel[]): UserListResponse {
    return new UserListResponse(users);
  }
}
