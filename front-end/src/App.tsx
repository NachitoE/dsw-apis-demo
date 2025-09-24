import { useEffect, useMemo, useState } from "react";
import { getApi } from "./adapters";
import type { Backend } from "./adapters";
import type { User } from "./apiTypes";
import { TracePanel } from "./components/TracePanel";

const PRESET_USERS = [
  { name: "Kazuma Kiryu", email: "kiryu@yakuza.jp" },
  { name: "R2-D2", email: "r2d2@rebelsgalaxy.xyz" },
  { name: "Gordon Freeman", email: "gordon@blackmesa.gov" },
  { name: "Doom Guy", email: "destroyerofdemons@doom.com" },
  { name: "Samus Aran", email: "samus@galactic-federation.org" },
  { name: "Link", email: "hero@hyrulekingdom.com" },
  { name: "Geralt of Rivia", email: "geralt@witcherschool.com" },
  { name: "Solid Snake", email: "thisisjustabox@foxhound.mil" },
  { name: "Gearless Joe", email: "joe@megalobox.com" },
  { name: "Frieren", email: "frieren@magic.com" },
  { name: "Laios", email: "laios@meshi.com" },
  { name: "Mob", email: "mob@psycho.com" },
  { name: "Harrier Du Bois", email: "drunkcop@elyisum.com" },
  { name: "Gregory House", email: "vicodinlover@princetonp.hospital" },
  { name: "John Marston", email: "john@wild-west.com" },
  { name: "Dante", email: "pizza123@dmc.com" },
];

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

  function loadRandomUser() {
    const randomUser =
      PRESET_USERS[Math.floor(Math.random() * PRESET_USERS.length)];
    setName(randomUser.name);
    setEmail(randomUser.email);
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
      className="px-3 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={{
        backgroundColor: active ? "#1d4ed8" : "white",
        color: active ? "white" : "#374151",
        boxShadow: active ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "#f9fafb";
        } else {
          e.currentTarget.style.backgroundColor = "#1e40af";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "white";
        } else {
          e.currentTarget.style.backgroundColor = "#1d4ed8";
        }
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl p-6 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">
            DSW APIs Demo
          </h1>
          <div className="inline-flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
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
          <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-5">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Formulario
            </h3>
            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={doCreate}
                  disabled={loading}
                  className="rounded-md px-4 py-2 text-sm font-semibold shadow-sm transition-colors"
                  style={{
                    backgroundColor: loading ? "#9ca3af" : "#1d4ed8",
                    color: "white",
                    opacity: loading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#1e40af";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#1d4ed8";
                    }
                  }}
                >
                  {loading ? "Creando…" : "Create"}
                </button>
                <button
                  onClick={doList}
                  disabled={loading}
                  className="rounded-md bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  {loading ? "Listando…" : "List"}
                </button>
                <button
                  onClick={loadRandomUser}
                  disabled={loading}
                  className="rounded-md bg-purple-600 dark:bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  🎲
                </button>
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Backend actual:{" "}
                <b className="text-gray-900 dark:text-gray-100">{backend}</b>
              </span>
            </div>
          </div>

          {/* Usuarios (a la izquierda en pantallas medianas+) */}
          <div className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-5">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Usuarios
            </h3>
            <div className="max-h-80 overflow-y-auto rounded-md border border-gray-300 dark:border-gray-600">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600 text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                      id
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                      name
                    </th>
                    <th className="px-3 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                      email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-3 py-2 font-mono text-[12px] text-gray-600 dark:text-gray-400">
                        {u.id}
                      </td>
                      <td className="px-3 py-2 text-gray-900 dark:text-gray-100">
                        {u.name}
                      </td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                        {u.email}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-6 text-center text-gray-500 dark:text-gray-400"
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
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Traza
          </h3>
          <TracePanel trace={trace} />
        </div>
      </div>
    </div>
  );
}
