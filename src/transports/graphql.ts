import type { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { services as Services } from "../services.js";

type ServicesType = typeof Services;

export async function mountGraphQL(
  app: Express,
  s: ServicesType,
  path = "/graphql"
) {
  const typeDefs = /* GraphQL */ `
    type User {
      id: ID!
      name: String!
      email: String!
    }
    type Query {
      users: [User!]!
    }
    type Mutation {
      createUser(name: String!, email: String!): User!
    }
  `;

  const resolvers = {
    Query: { users: () => s.listUsers() },
    Mutation: {
      createUser: (_: unknown, args: { name: string; email: string }) =>
        s.createUser(args.name, args.email),
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use(
    path,
    expressMiddleware(server, {
      context: async () => ({}),
    })
  );
}
