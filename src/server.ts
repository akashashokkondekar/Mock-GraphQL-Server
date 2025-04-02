import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { IncorrectUsernamePasswordMsg, InternalServerErrorMsg, UnAuthenticatedErrorCode, UserList } from './../Utils/AppConstant';
import { LoginResponse } from '../types/Interfaces';
import { AppUtils } from './../Utils/AppUtils';

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
  Mutation: {
    login: (_: any, { email, password }: { email: string; password: string }): LoginResponse => {
      const user = UserList.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new AuthenticationError(IncorrectUsernamePasswordMsg);
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
