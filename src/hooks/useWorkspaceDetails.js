import React, {useEffect, useState} from 'react';
import workspaceRepository   from "../repository/workspaceRepository.js";

const initialState = {
    workspace : null,
    loading : true,
    error: false,
}

const UseWorkspaceDetails = (workspaceId) => {
    const [workspace, setWorkspace] = useState(initialState);

    useEffect(() => {
        if(workspaceId){
            workspaceRepository
                .getById(workspaceId)
                .then((response) => {
                    setWorkspace({
                        workspace: response,
                        loading: false,
                        error: false,
                    });
                })
                .catch((error) => {
                    console.log(error)
                    setWorkspace((prev) => ({ ...prev, loading: false, error: true }));
                });
        }
    }, [workspaceId])


    return workspace;
};

export default UseWorkspaceDetails;