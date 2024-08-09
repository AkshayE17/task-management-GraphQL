import User from '../models/users.js';
import Organization from '../models/organization.js';
import Task from '../models/tasks.js';

const resolvers = {
    getOrganizations: async () => {
        return await Organization.find();
    },
    getUsers: async () => {
        return await User.find(); 
    },
    getTasks: async () => {
        return await Task.find();
    },
    createOrganization: async ({ name }) => {
        return await Organization.create({ name });
    },
    createUser: async ({ username, password, role, organizationId }) => {
        return await User.create({ username, password, role, organizationId });
    },
    createTask: async ({ title, description, status, dueDate, userId, organizationId }) => {
        return await Task.create({ title, description, status, dueDate, userId, organizationId });
    },
    updateTask: async ({ _id, title, description, status, dueDate }) => {
        return await Task.findByIdAndUpdate(_id, { title, description, status, dueDate }, { new: true });
    },
    deleteTask: async ({ _id }) => {
        return await Task.findByIdAndRemove(_id);
    }
};

export default resolvers;
