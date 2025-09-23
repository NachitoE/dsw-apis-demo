export type User = { id: string; name: string; email: string };
export type CreateUserInput = { name: string; email: string };

export type Transport = "REST" | "GraphQL" | "JSON-RPC" | "tRPC";

export type Trace = {
  transport: Transport;
  endpoint: string; // p.ej. POST /rest/users, /graphql, /rpc, /trpc
  meta?: string; // p.ej. "mutation createUser", "method=createUser"
  requestWire: unknown; // payload EXACTO enviado por la red
  responseWire: unknown; // respuesta cruda
  status?: number; // HTTP status si aplica
  ms?: number; // duración
};

export interface UserAPI {
  createUser(input: CreateUserInput): Promise<{ data: User; trace: Trace }>;
  listUsers(): Promise<{ data: User[]; trace: Trace }>;
}
