import type { Express } from "express";
import type { services as Services } from "../services.js";

type ServicesType = typeof Services;

export function mountRest(app: Express, s: ServicesType, base = "/rest") {
  app.get(`${base}/users`, async (_req, res) => {
    res.json(await s.listUsers());
  });

  app.post(`${base}/users`, async (req, res) => {
    try {
      const { name, email } = req.body ?? {};
      const user = await s.createUser(name, email);
      res.status(201).json(user);
    } catch (e: any) {
      res.status(400).json({ error: e?.message ?? "bad request" });
    }
  });
}
