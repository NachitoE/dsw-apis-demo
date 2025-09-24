import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setUsers([]);
    setTrace(undefined);
  }, [backend]);

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

  const SegButton = ({
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
        "px-4 py-2 text-sm font-medium border transition rounded-md",
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100",
      ].join(" ")}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl p-8 text-gray-900 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">API Fest — Demo Unificada</h1>
        <div className="flex gap-2">
          <SegButton
            active={backend === "rest"}
            onClick={() => setBackend("rest")}
          >
            REST
          </SegButton>
          <SegButton
            active={backend === "graphql"}
            onClick={() => setBackend("graphql")}
          >
            GraphQL
          </SegButton>
          <SegButton
            active={backend === "jsonrpc"}
            onClick={() => setBackend("jsonrpc")}
          >
            JSON-RPC
          </SegButton>
          <SegButton
            active={backend === "trpc"}
            onClick={() => setBackend("trpc")}
          >
            tRPC
          </SegButton>
        </div>
      </header>

      {/* Top zone: Form + Users */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulario */}
        <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Formulario</h3>
          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={doCreate}
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {loading ? "Creando…" : "Create"}
            </button>
            <button
              onClick={doList}
              disabled={loading}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            >
              {loading ? "Listando…" : "List"}
            </button>
            <span className="text-xs text-gray-500">
              Backend actual: <b>{backend}</b>
            </span>
          </div>
        </div>

        {/* Usuarios */}
        <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold">Usuarios</h3>
          <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">
                    id
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">
                    name
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600">
                    email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-xs text-gray-500">
                      {u.id}
                    </td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-gray-600">{u.email}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-3 py-6 text-center text-gray-400"
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

      {/* Traza */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Traza</h3>
        <TracePanel trace={trace} />
      </div>
    </div>
  );
}
