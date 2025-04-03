import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { IncorrectCredentialsErrorMsg, InternalServerErrorMsg, UnAuthenticatedErrorCode, UserList } from './../Utils/AppConstant';
import { LoginResponse, User } from '../types/Interfaces';
import { AppUtils } from './../Utils/AppUtils';

// Overall Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: Int!
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
      UserList.map(({ password, ...user }) => user),
  },
  Mutation: {
    login: (_: any, { email, password }: { email: string; password: string }): LoginResponse => {
      const user = UserList.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new AuthenticationError(IncorrectCredentialsErrorMsg);
      }
      return { 
        token: AppUtils.GenerateRandomGUID(), 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        } 
      };
    },
  },
};

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    if (err.extensions?.code === UnAuthenticatedErrorCode) {
      return {
        message: err.message,
        extensions: {
          code: err.extensions.code,
        },
      };
    }

    return {
      message: err.message,
      extensions: {
        code: err.extensions?.code || InternalServerErrorMsg,
      },
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is Running at ${url}`);
});
