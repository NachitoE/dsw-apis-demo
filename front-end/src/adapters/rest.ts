import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";

const BASE = "http://localhost:3000/rest";

export const restApi: UserAPI = {
  async createUser(input: CreateUserInput) {
    const t0 = performance.now();
    const res = await fetch(`${BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const responseWire = await res.json();
    const trace: Trace = {
      transport: "REST",
      endpoint: "POST /rest/users",
      requestWire: input,
      responseWire,
      status: res.status,
      ms: performance.now() - t0,
    };
    if (!res.ok) throw Object.assign(new Error("REST error"), { trace });
    return { data: responseWire as User, trace };
  },

  async listUsers() {
    const t0 = performance.now();
    const res = await fetch(`${BASE}/users`);
    const responseWire = await res.json();
    const trace: Trace = {
      transport: "REST",
      endpoint: "GET /rest/users",
      requestWire: null,
      responseWire,
      status: res.status,
      ms: performance.now() - t0,
    };
    if (!res.ok) throw Object.assign(new Error("REST error"), { trace });
    return { data: responseWire as User[], trace };
  },
};
