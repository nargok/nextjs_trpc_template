import { User } from '@/domain/model/user';
import { router, publicProcedure } from '@/server/index';
import { z } from 'zod';
import { UserRepositoryImpl } from '../infrastructure/repository/user';

const userList: User[] = [new User('Kato')];
const userRepository = new UserRepositoryImpl();

export const userRouter = router({
  userList: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */
      const limit = input.limit ?? 50;
      const { cursor } = input;

      return userList;
    }),
  userById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = userList.find((u) => u.id === id);
      return user;
    }),
  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation((req) => {
    const user = new User(req.input.name);
    return userRepository.register(user);
  }),
});