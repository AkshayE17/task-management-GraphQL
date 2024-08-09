
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Organization {
    _id: ID!
    name: String!
  }

  type User {
    _id: ID!
    username: String!
    role: String!
    organizationId: ID!
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    status: String
    dueDate: String
    userId: ID!
    organizationId: ID!
  }

  type Query {
    getOrganizations: [Organization]
    getUsers: [User]
    getTasks: [Task]
  }

  type Mutation {
    createOrganization(name: String!): Organization
    createUser(username: String!, password: String!, role: String!, organizationId: ID!): User
    createTask(title: String!, description: String, status: String, dueDate: String, userId: ID!, organizationId: ID!): Task
    updateTask(_id: ID!, title: String, description: String, status: String, dueDate: String): Task
    deleteTask(_id: ID!): Task
  }
`);

export default schema;
