import { Prisma } from '@prisma/client';
import { UserModel } from '@/domain/model/user';
import { UserRepository } from '@/domain/repository/user';
import { prisma } from '@/server/prisma';
import { User } from '@prisma/client';
import type { UserCreateInput } from '@prisma/client/index';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
});

export class UserRepositoryImpl implements UserRepository {
  async list(): Promise<UserModel[]> {
    // const limit = input.limit ?? 50;
    // const { cursor } = input;
    const limit = 50;
    const cursor = undefined;

    const users = await prisma.user.findMany({
      select: defaultUserSelect,
      take: limit + 1,
      where: {},
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    // TODO むずい。。
    // const result = users.map((user) => User.reconstruct(user.id, user.name));
    // return result;
    return users;
  }
  async register(user: UserModel): Promise<UserModel> {
    const data = {
      id: user.getId,
      name: user.getName,
    };
    const entity = await prisma.user.create({
      data,
      select: defaultUserSelect,
    });

    return this.toModel(entity);
  }

  private toModel(user: User): UserModel {
    return UserModel.reconstruct(user.id, user.name);
  }
}
