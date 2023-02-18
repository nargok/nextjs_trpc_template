import { UserModel } from '@/domain/model/user';
import { router, publicProcedure } from '@/server/index';
import { z } from 'zod';
import { UserRepositoryImpl } from '../infrastructure/repository/user';

const repository = new UserRepositoryImpl();

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
      // const limit = input.limit ?? 50;
      // const { cursor } = input;

      // TODO limit cursorを渡す
      return repository.list();
    }),
  userById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      return repository.find(id);
    }),
  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation((req) => {
    const user = UserModel.create(req.input.name);
    return repository.register(user);
  }),
});
