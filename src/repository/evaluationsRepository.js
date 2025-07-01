import * as api from "../api/evaluationsApi.js"

const evaluationsRepository = {
    fetchByUserIdAndModelId: async(user_id, model_name) => {
        return await api.fetchByUserModelAndWorkspace(user_id,model_name);
    },
    save: async (evaluationData) => {
        return await api.saveEvaluation(evaluationData);
    },
    fetchForReportByUserIdAndModelId: async (user_id, model_id) => {
        return await api.fetchForReportByUserIdAndModelId(user_id, model_id);
    }

}

export default evaluationsRepository;