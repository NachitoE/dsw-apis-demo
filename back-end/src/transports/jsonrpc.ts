import type { Express, Request, Response } from "express";
import type { services as Services } from "../services.js";

type ServicesType = typeof Services;

export function mountJsonRPC(app: Express, s: ServicesType, path = "/rpc") {
  app.post(path, async (req: Request, res: Response) => {
    const { id = null, method, params = {} } = req.body ?? {};
    const ok = (result: unknown) => res.json({ jsonrpc: "2.0", id, result });
    const err = (code: number, message: string) =>
      res.json({ jsonrpc: "2.0", id, error: { code, message } });

    try {
      if (method === "listUsers") return ok(await s.listUsers());
      if (method === "createUser") {
        const { name, email } = params as any;
        return ok(await s.createUser(name, email));
      }
      return err(-32601, "Method not found");
    } catch (e: any) {
      return err(-32602, e?.message ?? "Invalid params");
    }
  });
}
