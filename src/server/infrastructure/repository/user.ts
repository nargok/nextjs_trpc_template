import { Prisma } from '@prisma/client';
import { UserModel } from '@/domain/model/user';
import { UserRepository } from '@/domain/repository/user';
import { prisma } from '@/server/prisma';
import { User } from '@prisma/client';
import { UserListResponse } from '@/form/user';

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
  async find(id: string): Promise<UserModel> {
    const entity = await prisma.user.findUniqueOrThrow({
      where: { id },
      select: defaultUserSelect,
    });

    return this.toModel(entity);
  }

  async list(): Promise<UserListResponse> {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */
    const limit = 50;
    const cursor = undefined;

    const users = await prisma.user.findMany({
      select: defaultUserSelect,
      take: limit + 1,
      where: {},
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const userList = users.map((user: User) => this.toModel(user));
    return UserListResponse.create(userList);
  }
  async register(user: UserModel): Promise<UserModel> {
    const data = {
      id: user.id,
      name: user.name,
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
