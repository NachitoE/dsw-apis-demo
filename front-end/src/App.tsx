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
  const [dark, setDark] = useState<boolean>(() => {
    // preferencia inicial (persistible si querés)
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  // aplica tema al <html>
  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  // limpiar UI al cambiar tecnología
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
        "px-4 py-2 text-sm font-medium rounded-md transition focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-blue-500",
        active
          ? "bg-blue-600 text-white hover:bg-blue-500"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-700",
      ].join(" ")}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gray-50 p-8 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">API Fest — Demo Unificada</h1>

        <div className="flex items-center gap-3">
          {/* Toggle tema */}
          <button
            onClick={() => setDark((v) => !v)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            aria-label="Toggle theme"
            title="Cambiar tema"
          >
            {dark ? "Tema oscuro" : "Tema claro"}
          </button>

          {/* Botonera backend */}
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
        </div>
      </header>

      {/* Top: Form + Users */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulario */}
        <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-4 text-lg font-semibold">Formulario</h3>
          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={doCreate}
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loading ? "Creando…" : "Create"}
            </button>
            <button
              onClick={doList}
              disabled={loading}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300 disabled:opacity-60 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
            >
              {loading ? "Listando…" : "List"}
            </button>
            <span className="text-xs text-gray-500 dark:text-zinc-400">
              Backend actual:{" "}
              <b className="text-gray-700 dark:text-zinc-200">{backend}</b>
            </span>
          </div>
        </div>

        {/* Usuarios */}
        <div className="rounded-lg border border-gray-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="mb-3 text-lg font-semibold">Usuarios</h3>
          <div className="overflow-hidden rounded-md border border-gray-200 dark:border-zinc-700">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-zinc-700">
              <thead className="bg-gray-100 dark:bg-zinc-900/40">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-zinc-300">
                    id
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-zinc-300">
                    name
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-zinc-300">
                    email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50 dark:hover:bg-zinc-900/60"
                  >
                    <td className="px-3 py-2 font-mono text-xs text-gray-500 dark:text-zinc-400">
                      {u.id}
                    </td>
                    <td className="px-3 py-2">{u.name}</td>
                    <td className="px-3 py-2 text-gray-600 dark:text-zinc-300">
                      {u.email}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-3 py-6 text-center text-gray-400 dark:text-zinc-500"
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
