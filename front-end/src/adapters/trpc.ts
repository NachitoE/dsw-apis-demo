import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";
import type { AppRouter } from "../../../back-end/src/transports/trpc";

const URL = "http://localhost:3000/trpc";

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: URL })],
});

export const trpcApi: UserAPI = {
  async createUser(input: CreateUserInput) {
    const t0 = performance.now();
    // --- TIPADO ---
    const data: User = await client.user.createUser.mutate(input);

    const trace: Trace = {
      transport: "tRPC",
      endpoint: "POST /trpc/user.createUser",
      meta: "trpc mutate user.createUser",
      requestWire: { input },
      responseWire: data, // tRPC ya te da el dato “pelado”
      status: undefined,
      ms: performance.now() - t0,
    };
    return { data, trace };
  },

  async listUsers() {
    const t0 = performance.now();
    const data: User[] = await client.user.listUsers.query();

    const trace: Trace = {
      transport: "tRPC",
      endpoint: "POST /trpc/user.listUsers", // httpBatchLink usa POST, aunque sea query
      meta: "trpc query user.listUsers",
      requestWire: null,
      responseWire: data,
      status: undefined,
      ms: performance.now() - t0,
    };
    return { data, trace };
  },
};
