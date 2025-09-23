import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";

const URL = "http://localhost:3000/rpc";
let id = 0;

async function rpc<T>(method: string, params: unknown) {
  const t0 = performance.now();
  const req = { jsonrpc: "2.0", id: ++id, method, params };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  const json = await res.json();
  const trace: Trace = {
    transport: "JSON-RPC",
    endpoint: "POST /rpc",
    meta: `method=${method}`,
    requestWire: req,
    responseWire: json,
    status: res.status,
    ms: performance.now() - t0,
  };
  if (json.error) throw Object.assign(new Error("JSON-RPC error"), { trace });
  return { data: json.result as T, trace };
}

export const rpcApi: UserAPI = {
  createUser: (input: CreateUserInput) => rpc<User>("createUser", input),
  listUsers: () => rpc<User[]>("listUsers", {}),
};
