import mockData from "../mock/evaluations.json";
import reportData from "../mock/evaluationsPerUser.json";


let memoryEvaluations = [...mockData]
let reportEvals = [...reportData]


export const fetchByUserModelAndWorkspace = (user_id, model_name) => {
    return memoryEvaluations.find(
        (e) => e.user_id === user_id && e.model_name === model_name
    );
}

export const fetchForReportByUserIdAndModelId = (user_id, model_id) => {
    return reportEvals.find(
        (e) => e.user_id === user_id && e.model_id === model_id
    );
}

export const saveEvaluation = (evaluationData) => {
    const randomQId = "Q" + (Math.floor(Math.random() * 8) + 1);

    const newEvaluation = {
        question_id: randomQId,
        ...evaluationData
    };

    memoryEvaluations.push(newEvaluation);
    console.log("All evaluations:", memoryEvaluations);

    return newEvaluation;
};