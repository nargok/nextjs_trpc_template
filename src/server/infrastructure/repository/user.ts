import { Prisma } from '@prisma/client';
import { User } from '@/domain/model/user';
import { UserRepository } from '@/domain/repository/user';
import { prisma } from '@/server/prisma';

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

export class UserRepositoryImpl extends UserRepository {
  async register(user: User): Promise<User> {
    const result = await prisma.user.create({
      data: user,
      select: defaultUserSelect,
    });

    return result;
  }
}
