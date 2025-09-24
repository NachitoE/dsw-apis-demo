import { useMemo, useState } from "react";
import { getApi } from "./adapters";
import type { Backend } from "./adapters";
import type { User } from "./apiTypes";
import { TracePanel } from "./components/TracePanel";

export default function App() {
  const [backend, setBackend] = useState<Backend>("rest");
  const api = useMemo(() => getApi(backend), [backend]);

  const [name, setName] = useState("Alice");
  const [email, setEmail] = useState("alice@example.com");
  const [users, setUsers] = useState<User[]>([]);
  const [trace, setTrace] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);

  async function doList() {
    setLoading(true);
    try {
      const { data, trace } = await api.listUsers();
      setUsers(data);
      setTrace(trace);
    } finally {
      setLoading(false);
    }
  }

  async function doCreate() {
    setLoading(true);
    try {
      const { data, trace } = await api.createUser({ name, email });
      setTrace(trace);
      // refresca lista para ver el nuevo
      const out = await api.listUsers();
      setUsers(out.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 1100, margin: "24px auto", fontFamily: "system-ui" }}
    >
      <h2>API Fest — Demo Unificada</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setBackend("rest")}
          disabled={backend === "rest"}
        >
          REST
        </button>
        <button
          onClick={() => setBackend("graphql")}
          disabled={backend === "graphql"}
        >
          GraphQL
        </button>
        <button
          onClick={() => setBackend("jsonrpc")}
          disabled={backend === "jsonrpc"}
        >
          JSON-RPC
        </button>
        <button
          onClick={() => setBackend("trpc")}
          disabled={backend === "trpc"}
        >
          tRPC
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h3>Formulario</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button onClick={doCreate} disabled={loading}>
              Create
            </button>
            <button onClick={doList} disabled={loading}>
              List
            </button>
            <span style={{ opacity: 0.7 }}>
              Backend actual: <b>{backend}</b>
            </span>
          </div>

          <h3>Usuarios</h3>
          <table width="100%" border={1} cellPadding={6}>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Traza</h3>
          <TracePanel trace={trace} />
        </div>
      </div>
    </div>
  );
}
