import { router } from '@/server/index';
import { userRouter } from '@/server/router/user';

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
