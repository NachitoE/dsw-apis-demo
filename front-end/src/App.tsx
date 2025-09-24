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
    disableWhenActive = true,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    disableWhenActive?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disableWhenActive && active}
      className={[
        "px-3 py-1.5 text-sm font-medium transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
        active
          ? "bg-zinc-800 text-zinc-100"
          : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800",
      ].join(" ")}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto max-w-7xl p-6 text-zinc-100">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">
          DSW APIs Demo
        </h1>
        <div className="inline-flex overflow-hidden rounded-lg border border-zinc-700">
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

      {/* Zona superior: Form + Usuarios (dos columnas) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulario */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-5">
          <h3 className="mb-4 text-lg font-semibold">Formulario</h3>
          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-500"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={doCreate}
              disabled={loading}
              className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-600 disabled:opacity-50"
            >
              {loading ? "Creando…" : "Create"}
            </button>
            <button
              onClick={doList}
              disabled={loading}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
            >
              {loading ? "Listando…" : "List"}
            </button>
            <span className="text-xs text-zinc-400">
              Backend actual: <b className="text-zinc-200">{backend}</b>
            </span>
          </div>
        </div>

        {/* Usuarios (a la izquierda en pantallas medianas+) */}
        <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-5">
          <h3 className="mb-3 text-lg font-semibold">Usuarios</h3>
          <div className="overflow-hidden rounded-md border border-zinc-700">
            <table className="min-w-full divide-y divide-zinc-700 text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-zinc-200">
                    id
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-200">
                    name
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-zinc-200">
                    email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-900/60">
                    <td className="px-3 py-2 font-mono text-[12px] text-zinc-300">
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
                      className="px-3 py-6 text-center text-zinc-400"
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

      {/* Traza abajo, full width */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Traza</h3>
        <TracePanel trace={trace} />
      </div>
    </div>
  );
}
