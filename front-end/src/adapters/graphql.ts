import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import type { CreateUserInput, Trace, User, UserAPI } from "../apiTypes";

const URL = "http://localhost:3000/graphql";

const client = new ApolloClient({
  link: new HttpLink({ uri: URL }),
  cache: new InMemoryCache(),
});

// Definición “real” con gql
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const LIST_USERS = gql`
  query Users {
    users {
      id
      name
      email
    }
  }
`;

export const gqlApi: UserAPI = {
  async createUser(input: CreateUserInput) {
    const t0 = performance.now();

    const res = await client.mutate<{ createUser: User }>({
      mutation: CREATE_USER,
      variables: input,
      // fetchPolicy ‘no-cache’ para que la demo muestre wire real en cada click
      fetchPolicy: "no-cache",
    });

    const responseWire = res.data;
    const trace: Trace = {
      transport: "GraphQL",
      endpoint: "POST /graphql",
      meta: "ApolloClient mutation CreateUser",
      requestWire: { query: CREATE_USER.loc?.source.body, variables: input },
      responseWire,
      status: 200, // Apollo no expone HTTP status directo; 200 si no throw
      ms: performance.now() - t0,
    };

    if (!res.data)
      throw Object.assign(new Error("GraphQL mutation failed"), { trace });
    return { data: res.data.createUser, trace };
  },

  async listUsers() {
    const t0 = performance.now();

    const res = await client.query<{ users: User[] }>({
      query: LIST_USERS,
      fetchPolicy: "no-cache",
    });

    const responseWire = res.data;
    const trace: Trace = {
      transport: "GraphQL",
      endpoint: "POST /graphql",
      meta: "ApolloClient query Users",
      requestWire: { query: LIST_USERS.loc?.source.body, variables: undefined },
      responseWire,
      status: 200,
      ms: performance.now() - t0,
    };

    if (!res.data)
      throw Object.assign(new Error("GraphQL query failed"), { trace });
    return { data: res.data.users, trace };
  },
};
