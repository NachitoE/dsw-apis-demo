// src/transports/trpc.ts (backend)
import type { Express } from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { services as Services } from "../services.js";

type ServicesType = typeof Services;

const t = initTRPC.context<{ s: ServicesType }>().create();

export const appRouter = t.router({
  user: t.router({
    listUsers: t.procedure.query(({ ctx }) => ctx.s.listUsers()),
    createUser: t.procedure
      .input((val: any) => {
        if (!val?.name || !val?.email) throw new Error("name/email requeridos");
        return val as { name: string; email: string };
      })
      .mutation(({ ctx, input }) => ctx.s.createUser(input.name, input.email)),
  }),
});

export type AppRouter = typeof appRouter;

export function mountTRPC(app: Express, s: ServicesType, path = "/trpc") {
  app.use(
    path,
    createExpressMiddleware({ router: appRouter, createContext: () => ({ s }) })
  );
}
