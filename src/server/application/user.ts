import { UserModel } from '@/domain/model/user';
import { UserListResponse } from '@/form/user';
import { UserRepositoryImpl } from '../infrastructure/repository/user';

const repository = new UserRepositoryImpl();

export class UserUseCase {
  list(): Promise<UserListResponse> {
    return repository.list();
  }

  find(id: string): Promise<UserModel> {
    return repository.find(id);
  }

  register(user: UserModel): Promise<UserModel> {
    return repository.register(user);
  }
}
