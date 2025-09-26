import { makeApp } from "./app.js";
import { services } from "./services.js";
import { mountRest } from "./transports/rest.js";
import { mountJsonRPC } from "./transports/jsonrpc.js";
import { mountGraphQL } from "./transports/graphql.js";
import { mountTRPC } from "./transports/trpc.js";
import { mountSwagger } from "./swagger.js";

async function main() {
  const app = makeApp();

  mountSwagger(app, "/rest/docs");
  mountRest(app, services, "/rest");
  mountJsonRPC(app, services, "/rpc");
  await mountGraphQL(app, services, "/graphql");
  mountTRPC(app, services, "/trpc");

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Hosteado en http://localhost:${PORT}`);
    console.log(`REST DOCS→ /rest/docs`);
    console.log(`REST     → /rest`);
    console.log(`JSON-RPC → /rpc`);
    console.log(`GraphQL  → /graphql`);
    console.log(`tRPC     → /trpc`);
  });
}
main();
