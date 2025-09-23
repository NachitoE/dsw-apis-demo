import type { UserAPI } from "../apiTypes";
import { restApi } from "./rest";
import { gqlApi } from "./graphql";
import { rpcApi } from "./jsonrpc";
import { trpcApi } from "./trpc";

export type Backend = "rest" | "graphql" | "jsonrpc" | "trpc";

export function getApi(b: Backend): UserAPI {
  switch (b) {
    case "rest":
      return restApi;
    case "graphql":
      return gqlApi;
    case "jsonrpc":
      return rpcApi;
    case "trpc":
      return trpcApi;
  }
}
