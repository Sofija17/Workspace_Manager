import React, {useCallback, useEffect, useState} from 'react';
import evaluationsRepository from "../repository/evaluationsRepository.js";


const initialState = {
    evaluation: null,
    loading: true,
};


const useEvaluations = (userId, model_name) => {
    const [evaluation, setEvaluation] = useState(initialState);

    const fetchEvalByUserIdAndModelName = useCallback((userId, model_name) => {
        setEvaluation(initialState);
        evaluationsRepository
            .fetchByUserIdAndModelId(userId,model_name)
            .then((response) => {
                setEvaluation({
                    ...response,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Error fetching evaluation:", error);
                setEvaluation((prev) => ({ ...prev, loading: false }));
            });
    }, []);

    const fetchForReportByUserIdAndModelId = useCallback((userId, modelId) => {
        setEvaluation(initialState);
        evaluationsRepository
            .fetchForReportByUserIdAndModelId(userId,modelId)
            .then((response) => {
                setEvaluation({
                    ...response,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Error fetching evaluation:", error);
                setEvaluation((prev) => ({ ...prev, loading: false }));
            });
    }, []);

    const saveEvaluation = useCallback((data) => {
        return evaluationsRepository
            .save(data)
            .then((saved) => {
                setEvaluation({
                    evaluation: saved,
                    loading: false
                });
               fetchEvalByUserIdAndModelName()
            })
            .catch((error) => {
                console.error("Error saving evaluation:", error);

            });
    }, []);

    useEffect(() => {
        if(userId && model_name){
            fetchEvalByUserIdAndModelName(userId,model_name)
        }
    }, [userId,model_name, fetchEvalByUserIdAndModelName]);

    return {  fetchForReportByUserIdAndModelId,saveEvaluation, evaluation, fetchEvalByUserIdAndModelName}
};

export default useEvaluations;