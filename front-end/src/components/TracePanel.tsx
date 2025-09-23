import type { Trace } from "../apiTypes";

export function TracePanel({ trace }: { trace?: Trace }) {
  if (!trace) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-zinc-400">
        Sin traza todavía…
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Enviado */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-200">
          Lo que se <span className="text-emerald-400">ENVÍA</span>
        </h4>
        <pre className="max-h-64 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-emerald-300">
          {JSON.stringify(trace.requestWire, null, 2)}
        </pre>
      </section>

      {/* Procesado */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-200">
          Cómo se <span className="text-blue-400">PROCESA</span>
        </h4>
        <div className="space-y-1 text-sm text-zinc-300">
          <div>
            <span className="text-zinc-400">Transporte:</span>{" "}
            <span className="font-medium">{trace.transport}</span>
          </div>
          <div>
            <span className="text-zinc-400">Endpoint:</span>{" "}
            <span className="font-mono text-xs">{trace.endpoint}</span>
          </div>
          {trace.meta && (
            <div>
              <span className="text-zinc-400">Meta:</span>{" "}
              <span className="font-mono text-xs">{trace.meta}</span>
            </div>
          )}
          {"status" in trace && trace.status !== undefined && (
            <div>
              <span className="text-zinc-400">Status:</span>{" "}
              <span>{trace.status}</span>
            </div>
          )}
          {"ms" in trace && trace.ms !== undefined && (
            <div>
              <span className="text-zinc-400">Duración:</span>{" "}
              <span>{Math.round(trace.ms!)} ms</span>
            </div>
          )}
        </div>
      </section>

      {/* Recibido */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-200">
          Lo que se <span className="text-fuchsia-400">RECIBE</span>
        </h4>
        <pre className="max-h-64 overflow-auto rounded-lg bg-black/40 p-3 text-xs text-fuchsia-300">
          {JSON.stringify(trace.responseWire, null, 2)}
        </pre>
      </section>
    </div>
  );
}
