import superjson from 'superjson';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from '@/server/context';
import { User } from '@/domain/model/user';

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v10/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
export const middleware = t.middleware;

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters;

const userList: User[] = [
  {
    id: '1',
    name: 'Kato',
  },
];

// TODO routesにわける
export const appRouter = router({
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
    const id = `${Math.random()}`;

    const user: User = {
      id,
      name: req.input.name,
    };

    userList.push(user);

    return user;
  }),
});

export type AppRouter = typeof appRouter;
