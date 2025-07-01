import * as api from "../api/workspaceApi.js"

const workspaceRepository = {
    getByUser: async (userId) => {
        return await api.fetchWorkspacesByUser(userId);
    },
    getById : async (workspaceId) => {
        return await api.fetchWorkspaceById(workspaceId)
    },
    create: async (name, userId, members) => {
        return await api.createWorkspace(name, userId, members);
    },
    inviteUser: async (workspaceId, userId) => {
        return await api.inviteUserToWorkspace(workspaceId,userId)
    },
    removeUser: async (workspaceId, userId) => {
        return await api.removeUserFromWorkspace(workspaceId,userId)
    }

};

export default workspaceRepository;