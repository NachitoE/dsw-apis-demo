import express from "express";
import cors from "cors";
//import { restRouter } from "./rest";
//import { rpcRouter } from "./rpc";
//import { applyGraphQL } from "./graphql";
//import { applyTRPC } from "./trpc";

const app = express();
app.use(cors());
app.use(express.json());

// Salud
app.get("/health", (_req, res) => res.json({ ok: true }));

// REST
//app.use("/rest", restRouter);
// JSON-RPC
//app.use("/rpc", rpcRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
/*
(async () => {
await applyGraphQL(app);
applyTRPC(app);
*/

app.listen(PORT, () => {
  console.log(`API Fest backend listo en http://localhost:${PORT}`);
  console.log("REST → GET/POST /rest/users");
  console.log("JSON‑RPC → POST /rpc");
  console.log("GraphQL → POST /graphql");
  console.log("tRPC → HTTP link /trpc");
});
