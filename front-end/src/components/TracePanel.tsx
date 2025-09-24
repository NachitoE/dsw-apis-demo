import type { Trace } from "../apiTypes";

export function TracePanel({ trace }: { trace?: Trace }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Cada caja ocupa el alto disponible y hace scroll interno */}
      <section className="flex min-h-[52vh] flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-100">
          Lo que se <span className="text-zinc-300">ENVÍA</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto rounded-md bg-zinc-900 p-3 font-mono text-[13px] leading-relaxed text-zinc-200">
          {trace ? JSON.stringify(trace.requestWire, null, 2) : "—"}
        </pre>
      </section>

      <section className="flex min-h-[52vh] flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-100">
          Cómo se <span className="text-zinc-300">PROCESA</span>
        </h4>
        {trace ? (
          <div className="mt-1 flex-1 overflow-auto space-y-2 rounded-md bg-zinc-900 p-3 text-sm text-zinc-200">
            <div>
              <span className="text-zinc-400">Transporte:</span>{" "}
              <span className="font-medium">{trace.transport}</span>
            </div>
            <div>
              <span className="text-zinc-400">Endpoint:</span>{" "}
              <span className="font-mono text-[12px]">{trace.endpoint}</span>
            </div>
            {trace.meta && (
              <div>
                <span className="text-zinc-400">Meta:</span>{" "}
                <span className="font-mono text-[12px]">{trace.meta}</span>
              </div>
            )}
            {typeof trace.status !== "undefined" && (
              <div>
                <span className="text-zinc-400">Status:</span>{" "}
                <span>{trace.status}</span>
              </div>
            )}
            {typeof trace.ms !== "undefined" && (
              <div>
                <span className="text-zinc-400">Duración:</span>{" "}
                <span>{Math.round(trace.ms!)} ms</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 rounded-md bg-zinc-900 p-3 text-zinc-400">
            Sin datos todavía…
          </div>
        )}
      </section>

      <section className="flex min-h-[52vh] flex-col rounded-lg border border-zinc-700 bg-zinc-800 p-4">
        <h4 className="mb-2 text-sm font-semibold text-zinc-100">
          Lo que se <span className="text-zinc-300">RECIBE</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto rounded-md bg-zinc-900 p-3 font-mono text-[13px] leading-relaxed text-zinc-200">
          {trace ? JSON.stringify(trace.responseWire, null, 2) : "—"}
        </pre>
      </section>
    </div>
  );
}
