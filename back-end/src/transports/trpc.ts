import type { Express } from "express";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { services as Services } from "../services.js";

type ServicesType = typeof Services;

export function mountTRPC(app: Express, s: ServicesType, path = "/trpc") {
  const t = initTRPC.create();

  const router = t.router({
    user: t.router({
      listUsers: t.procedure.query(() => s.listUsers()),
      createUser: t.procedure
        .input((val: any) => {
          if (!val?.name || !val?.email)
            throw new Error("name/email requeridos");
          return val as { name: string; email: string };
        })
        .mutation(({ input }) => s.createUser(input.name, input.email)),
    }),
  });

  app.use(path, createExpressMiddleware({ router }));
  // (Opcional) exportá el tipo si tu front lo consume:
  // export type AppRouter = typeof router;
}
