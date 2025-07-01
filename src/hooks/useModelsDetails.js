import { useEffect, useState } from "react";
import modelsRepository from "../repository/modelsRepository.js";

const initialState = {
    model: null,
    loading: true
};

const useModelDetails = (modelId) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (!modelId) return;

        setState(initialState);

        modelsRepository
            .getById(modelId)
            .then((response) => {
                const model = Array.isArray(response) ? response[0] : response;

                if (!model) {
                    setState({ model: null, loading: false });
                    return;
                }

                setState({
                    model,
                    loading: false
                });
            })
            .catch((error) => {
                console.error("Error fetching model:", error);
                setState((prev) => ({ ...prev, loading: false }));
            });
    }, [modelId]);

    return state;
};

export default useModelDetails;
