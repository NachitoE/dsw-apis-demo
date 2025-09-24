import type { Trace } from "../apiTypes";

function formatData(data: any) {
  if (!data) return "—";
  if (typeof data === "object" && "query" in data) {
    return [
      (data as any).query,
      (data as any).variables
        ? JSON.stringify((data as any).variables, null, 2)
        : null,
    ]
      .filter(Boolean)
      .join("\n\nVariables:\n");
  }
  if (typeof data === "string" && data.includes("\n")) return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export function TracePanel({ trace }: { trace?: Trace }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Enviado */}
      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-zinc-100">
          Lo que se{" "}
          <span className="text-gray-500 dark:text-zinc-300">ENVÍA</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto whitespace-pre-wrap rounded-md bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-800 dark:bg-zinc-900 dark:text-zinc-200">
          {trace ? formatData(trace.requestWire) : "—"}
        </pre>
      </section>

      {/* Procesa */}
      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-zinc-100">
          Cómo se{" "}
          <span className="text-gray-500 dark:text-zinc-300">PROCESA</span>
        </h4>
        {trace ? (
          <div className="mt-1 flex-1 overflow-auto space-y-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700 dark:bg-zinc-900 dark:text-zinc-200">
            <div>
              <span className="text-gray-500 dark:text-zinc-400">
                Transporte:
              </span>{" "}
              {trace.transport}
            </div>
            <div>
              <span className="text-gray-500 dark:text-zinc-400">
                Endpoint:
              </span>{" "}
              <span className="font-mono text-[12px]">{trace.endpoint}</span>
            </div>
            {"meta" in (trace as any) && (trace as any).meta && (
              <div>
                <span className="text-gray-500 dark:text-zinc-400">Meta:</span>{" "}
                <span className="font-mono text-[12px]">
                  {(trace as any).meta}
                </span>
              </div>
            )}
            {typeof trace.status !== "undefined" && (
              <div>
                <span className="text-gray-500 dark:text-zinc-400">
                  Status:
                </span>{" "}
                {trace.status}
              </div>
            )}
            {typeof trace.ms !== "undefined" && (
              <div>
                <span className="text-gray-500 dark:text-zinc-400">
                  Duración:
                </span>{" "}
                {Math.round(trace.ms!)} ms
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 rounded-md bg-gray-50 p-3 text-gray-400 dark:bg-zinc-900 dark:text-zinc-400">
            Sin datos todavía…
          </div>
        )}
      </section>

      {/* Recibe */}
      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h4 className="mb-2 text-sm font-semibold text-gray-800 dark:text-zinc-100">
          Lo que se{" "}
          <span className="text-gray-500 dark:text-zinc-300">RECIBE</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto whitespace-pre-wrap rounded-md bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-800 dark:bg-zinc-900 dark:text-zinc-200">
          {trace ? formatData(trace.responseWire) : "—"}
        </pre>
      </section>
    </div>
  );
}
