import { useCallback, useEffect, useState } from "react";
import modelsRepository from "../repository/modelsRepository.js"

const initialState = {
    data: [],
    loading: true,
};

const useModels = (workspaceId) => {
    const [models, setModels] = useState(initialState);


    const fetchModelsByWorkspace = useCallback(() => {
        setModels(initialState);
        modelsRepository
            .getByWorkspace(workspaceId)
            .then((response) => {
                setModels({
                    data: response,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Error fetching models:", error);
                setModels((prev) => ({ ...prev, loading: false }));
            });
    }, [workspaceId]);



    const addModel = useCallback((model_name, userId, options = {}) => {
        modelsRepository
            .addModel(workspaceId, model_name, userId, options)
            .then(() => {
                console.log("Model added");
                fetchModelsByWorkspace();
            })
            .catch((error) => console.error("Error adding model:", error));
    }, [workspaceId, fetchModelsByWorkspace]);


    const deleteModel= useCallback((modelId) => {
        modelsRepository
            .deleteModel(modelId)
            .then(() => {
                console.log("Model deleted")
                fetchModelsByWorkspace()
            })
            .catch((error) => console.log(error))
    }, [fetchModelsByWorkspace])



    useEffect(() => {
        if (workspaceId) {
            fetchModelsByWorkspace();
        }
    }, [workspaceId, fetchModelsByWorkspace]);

    return {
        ...models,
        models: models.data,
        addModel,
        deleteModel
    };
};

export default useModels;
