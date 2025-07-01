import * as api from "../api/modelsApi.js"

const modelsRepository = {
    getByWorkspace:  async (workspaceId) => {
        return await api.fetchModelsByWorkspace(workspaceId);
    },
    getById: async (modelId) => {
        return await api.fetchModelById(modelId);
    },
    addModel: async (workspaceId, model_name, userId, options = {}) => {
        return await api.addModelToWorkspace(workspaceId, model_name, userId, options);
    },
    deleteModel: async(modelId) => {
        return await api.deleteModelById(modelId);
    }

};

export default modelsRepository;