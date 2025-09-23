import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";

const URL = "http://localhost:3000/graphql";

const CREATE = `
mutation($name:String!,$email:String!){
  createUser(name:$name, email:$email){ id name email }
}`;
const LIST = `query { users { id name email } }`;

async function call<T>(query: string, variables?: Record<string, unknown>) {
  const t0 = performance.now();
  const req = { query, variables };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  const json = await res.json();
  const traceBase: Omit<Trace, "transport"> = {
    endpoint: "POST /graphql",
    meta: query.trim().startsWith("mutation")
      ? "GraphQL mutation"
      : "GraphQL query",
    requestWire: req,
    responseWire: json,
    status: res.status,
    ms: performance.now() - t0,
  };
  if (json.errors) {
    const trace: Trace = { transport: "GraphQL" as const, ...traceBase };
    throw Object.assign(new Error("GraphQL error"), { trace });
  }
  return {
    data: json.data as T,
    trace: { transport: "GraphQL" as const, ...traceBase } as Trace,
  };
}

export const gqlApi: UserAPI = {
  async createUser(input: CreateUserInput) {
    const { data, trace } = await call<{ createUser: User }>(CREATE, input);
    return { data: data.createUser, trace };
  },
  async listUsers() {
    const { data, trace } = await call<{ users: User[] }>(LIST);
    return { data: data.users, trace };
  },
};
