import { AuthenticationError, ForbiddenError } from '../config/errorhandiing.js'

import User from '../models/users.js';
import Organization from '../models/organization.js';
import Task from '../models/tasks.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const checkRole = (user, requiredRole) => {
  const roles = ['User', 'Manager', 'Admin'];
  return roles.indexOf(user.role) >= roles.indexOf(requiredRole);
};

const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError('Invalid token');
  }
};

const resolvers = {
  Query: {
    getOrganizations: async (_, __, { token }) => {
      const user = getUserFromToken(token);
      if (!checkRole(user, 'Admin')) throw new ForbiddenError('Access denied');
      return await Organization.find();
    },
    getUsers: async (_, __, { token }) => {
      const user = getUserFromToken(token);
      if (!checkRole(user, 'Admin')) throw new ForbiddenError('Access denied');
      return await User.find();
    },
    getTasks: async (_, __, { token }) => {
      const user = getUserFromToken(token);
      const role = user.role;
      const organizationId = user.organizationId;
      if (role === 'Admin') {
        return await Task.find();
      } else if (role === 'Manager') {
        return await Task.find({ organizationId });
      } else if (role === 'User') {
        return await Task.find({ userId: user._id });
      }
      throw new ForbiddenError('Access denied');
    },
  },
  Mutation: {
    createOrganization: async (_, { name }, { token }) => {
      const user = getUserFromToken(token);
      if (!checkRole(user, 'Admin')) throw new ForbiddenError('Access denied');
      return await Organization.create({ name });
    },
    createUser: async (_, { username, password, role, organizationId }, { token }) => {
      const user = getUserFromToken(token);
      if (!checkRole(user, 'Admin')) throw new ForbiddenError('Access denied');
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({ username, password: hashedPassword, role, organizationId });
    },
    createTask: async (_, { title, description, status, dueDate, userId, organizationId }, { token }) => {
      const user = getUserFromToken(token);
      if (!checkRole(user, 'Manager') && user._id.toString() !== userId.toString()) {
        throw new ForbiddenError('Access denied');
      }
      return await Task.create({ title, description, status, dueDate, userId, organizationId });
    },
    updateTask: async (_, { _id, title, description, status, dueDate }, { token }) => {
      const user = getUserFromToken(token);
      const task = await Task.findById(_id);
      if (!task) throw new Error('Task not found');
      if (user.role === 'Admin' || (user.role === 'Manager' && user.organizationId.toString() === task.organizationId.toString()) || user._id.toString() === task.userId.toString()) {
        return await Task.findByIdAndUpdate(_id, { title, description, status, dueDate }, { new: true });
      }
      throw new ForbiddenError('Access denied');
    },
    deleteTask: async (_, { _id }, { token }) => {
      const user = getUserFromToken(token);
      const task = await Task.findById(_id);
      if (!task) throw new Error('Task not found');
      if (user.role === 'Admin' || (user.role === 'Manager' && user.organizationId.toString() === task.organizationId.toString()) || user._id.toString() === task.userId.toString()) {
        return await Task.findByIdAndRemove(_id);
      }
      throw new ForbiddenError('Access denied');
    },
  },
  login: async (_, { username, password }) => {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, organizationId: user.organizationId },
      process.env.JWT_SECRET,  // Ensure this is set in your .env file
      { expiresIn: '1h' }  // Token expiration time
    );

    return { token };
  }
};


export default resolvers;

