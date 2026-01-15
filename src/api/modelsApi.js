import mockData from "../mock/models.json"


let memoryModels = [...mockData]

export const fetchModelsByWorkspace = async (workspaceId) => {
    return memoryModels.filter((model) => model.workspace_id === workspaceId);
};

export const fetchModelById = async (modelId) => {
    return memoryModels.filter((model) => model.id === modelId);
}

export const addModelToWorkspace = async (workspaceId, model_name, userId, options = {}) => {
    console.log(" ADD MODEL DEBUG:", {
        workspaceId,
        model_name,
        userId,
        options
    });

    const newModel = {
        id: "model_" + Math.random().toString(36).substring(2, 6),
        model_name,
        workspace_id: workspaceId,
        evaluated_by: [userId],
        evaluation_progress: 0,
        status: "in_progress",
        description: options.description || "",
        date_created: new Date().toISOString(),
        created_by: userId,

    };
    memoryModels.push(newModel);
    return newModel;
};

export const deleteModelById = async (modelId) => {

    memoryModels = memoryModels.filter((model) => model.id !== modelId);
    return memoryModels;
};


