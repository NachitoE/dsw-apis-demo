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
      const { trace } = await api.createUser({ name, email });
      setTrace(trace);
      const out = await api.listUsers();
      setUsers(out.data);
    } finally {
      setLoading(false);
    }
  }

  const Btn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={[
        "rounded-lg px-3 py-1.5 text-sm font-medium transition",
        active
          ? "bg-emerald-500 text-black shadow"
          : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
      ].join(" ")}
      disabled={active}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl p-6 text-zinc-100">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">API Fest — Demo Unificada</h1>
        <div className="flex gap-2">
          <Btn active={backend === "rest"} onClick={() => setBackend("rest")}>
            REST
          </Btn>
          <Btn
            active={backend === "graphql"}
            onClick={() => setBackend("graphql")}
          >
            GraphQL
          </Btn>
          <Btn
            active={backend === "jsonrpc"}
            onClick={() => setBackend("jsonrpc")}
          >
            JSON-RPC
          </Btn>
          <Btn active={backend === "trpc"} onClick={() => setBackend("trpc")}>
            tRPC
          </Btn>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Columna izquierda: formulario + tabla */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-4 text-lg font-semibold">Formulario</h3>
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={doCreate}
                disabled={loading}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? "Creando…" : "Create"}
              </button>
              <button
                onClick={doList}
                disabled={loading}
                className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-700 disabled:opacity-60"
              >
                {loading ? "Listando…" : "List"}
              </button>
              <span className="text-xs text-zinc-400">
                Backend actual: <b className="text-zinc-200">{backend}</b>
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="mb-3 text-lg font-semibold">Usuarios</h3>
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <table className="min-w-full divide-y divide-zinc-800 text-sm">
                <thead className="bg-zinc-900/60">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-zinc-300">
                      id
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-300">
                      name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-zinc-300">
                      email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-900/50">
                      <td className="px-3 py-2 font-mono text-xs text-zinc-300">
                        {u.id}
                      </td>
                      <td className="px-3 py-2">{u.name}</td>
                      <td className="px-3 py-2 text-zinc-300">{u.email}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-6 text-center text-zinc-500"
                      >
                        Sin usuarios todavía…
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna derecha: traza */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h3 className="mb-3 text-lg font-semibold">Traza</h3>
          <TracePanel trace={trace} />
        </div>
      </div>
    </div>
  );
}
