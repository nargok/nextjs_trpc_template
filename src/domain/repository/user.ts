import { User } from '../model/user';

export abstract class UserRepository {
  abstract register(user: User): Promise<User>;
}
