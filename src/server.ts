import { ApolloServer, gql } from 'apollo-server';
import { IncorrectUsernamePasswordMsg, UsersData } from '../utils/AppConstant';
import { LoginResponse, User } from '../types/Interfaces';
import { AppUtils } from '../utils/AppUtils';

// Overall Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
  }

  type LoginResponse {
    token: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    users: (): Omit<User, 'password'>[] =>
      UsersData.map(({ password, ...user }) => user),
  },
  Mutation: {
    login: (_: unknown, { email, password }: { email: string; password: string }): LoginResponse => {
      const user = UsersData.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error(IncorrectUsernamePasswordMsg);
      }
      return { token: AppUtils.GenerateRandomGUID(), user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    },
  },
};

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server is Running at ${url}`);
});
