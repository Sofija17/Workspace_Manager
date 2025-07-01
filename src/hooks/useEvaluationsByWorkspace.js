import { useMemo } from "react";
import evaluations from "../mock/evaluations.json";

const useEvaluationsByWorkspace = (workspaceId) => {
    return useMemo(() => {
        return evaluations.filter(e => e.workspace_id === workspaceId);
    }, [workspaceId]);
};

export default useEvaluationsByWorkspace;
