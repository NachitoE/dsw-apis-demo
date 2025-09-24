import type { Trace } from "../apiTypes";

function formatData(data: any) {
  if (!data) return "—";
  if (typeof data === "object" && "query" in data) {
    return [
      (data as any).query,
      data.variables ? JSON.stringify(data.variables, null, 2) : null,
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
      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">
          Lo que se <span className="text-gray-500">ENVÍA</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto rounded-md bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap">
          {trace ? formatData(trace.requestWire) : "—"}
        </pre>
      </section>

      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">
          Cómo se <span className="text-gray-500">PROCESA</span>
        </h4>
        {trace ? (
          <div className="mt-1 flex-1 overflow-auto space-y-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
            <div>
              <span className="text-gray-500">Transporte:</span>{" "}
              {trace.transport}
            </div>
            <div>
              <span className="text-gray-500">Endpoint:</span>{" "}
              <span className="font-mono text-[12px]">{trace.endpoint}</span>
            </div>
            {trace.meta && (
              <div>
                <span className="text-gray-500">Meta:</span>{" "}
                <span className="font-mono text-[12px]">{trace.meta}</span>
              </div>
            )}
            {typeof trace.status !== "undefined" && (
              <div>
                <span className="text-gray-500">Status:</span> {trace.status}
              </div>
            )}
            {typeof trace.ms !== "undefined" && (
              <div>
                <span className="text-gray-500">Duración:</span>{" "}
                {Math.round(trace.ms!)} ms
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 rounded-md bg-gray-50 p-3 text-gray-400">
            Sin datos todavía…
          </div>
        )}
      </section>

      <section className="flex min-h-[40vh] flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-gray-800">
          Lo que se <span className="text-gray-500">RECIBE</span>
        </h4>
        <pre className="mt-1 flex-1 overflow-auto rounded-md bg-gray-50 p-3 font-mono text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap">
          {trace ? formatData(trace.responseWire) : "—"}
        </pre>
      </section>
    </div>
  );
}
