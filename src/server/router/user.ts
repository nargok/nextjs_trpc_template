import { UserModel } from '@/domain/model/user';
import { router, publicProcedure } from '@/server/index';
import { z } from 'zod';
import { UserUseCase } from '../application/user';

const useCase = new UserUseCase();

export const userRouter = router({
  userList: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => useCase.list()),
  userById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      return useCase.find(id);
    }),
  userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation((req) => {
    const user = UserModel.create(req.input.name);
    return useCase.register(user);
  }),
});
