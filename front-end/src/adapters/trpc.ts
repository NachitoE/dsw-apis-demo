import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";

const URL = "http://localhost:3000/trpc"; // endpoints: /trpc/user.createUser, /trpc/user.listUsers

async function trpcCall<T>(
  path: string,
  input?: unknown,
  isMutation?: boolean
) {
  const t0 = performance.now();
  const url = `${URL}/${path}`;
  const req = isMutation
    ? { method: "POST", body: JSON.stringify({ input }) }
    : { method: "GET" }; // para demo, listUsers puede ser GET sin body

  const res = await fetch(url, {
    ...req,
    headers: { "Content-Type": "application/json" },
  });
  const json = await res.json();

  const trace: Trace = {
    transport: "tRPC",
    endpoint: `${req.method} ${url}`,
    meta: path,
    requestWire: isMutation ? { input } : null,
    responseWire: json,
    status: res.status,
    ms: performance.now() - t0,
  };

  if (!res.ok) throw Object.assign(new Error("tRPC error"), { trace });

  // Respuesta de tRPC viene en envoltorio { result: { data: ... } } (o batch)
  const data = json?.result?.data ?? json?.[0]?.result?.data;
  return { data: data as T, trace };
}

export const trpcApi: UserAPI = {
  createUser: (input: CreateUserInput) =>
    trpcCall<User>("user.createUser", input, true),
  listUsers: () => trpcCall<User[]>("user.listUsers"),
};
