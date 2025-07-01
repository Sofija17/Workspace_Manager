import {useCallback, useEffect, useState} from "react";
import workspaceRepository from "../repository/workspaceRepository.js"

const initialState = {
    workspaces: [],
    loading: true,
};

const useWorkspaces = (userId) => {
    const [state, setState] = useState(initialState);


    const fetchWorkspacesByUser = useCallback(() => {
        setState(initialState);
        workspaceRepository
            .getByUser(userId)
            .then((response) => {
                setState({
                    workspaces: response,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Error fetching workspaces:", error);
                setState((prev) => ({...prev, loading: false}));
            });
    }, [userId]);


    const createWorkspace = useCallback(
        (name, members, userId) => {
            workspaceRepository
                .create(name, userId, members)  // ← members are now passed!
                .then(() => {
                    console.log("Successfully created workspace");
                    fetchWorkspacesByUser();
                })
                .catch((error) => console.error("Error creating workspace:", error));
        },
        [userId, fetchWorkspacesByUser]

    );


    const inviteUser = useCallback(
        (workspaceId, invitedUserId) => {
            workspaceRepository
                .inviteUser(workspaceId, invitedUserId)
                .then(() => {
                    console.log(`User ${invitedUserId} invited`);
                    fetchWorkspacesByUser();
                })
                .catch((error) => console.error("Error inviting user:", error));
        },
        [fetchWorkspacesByUser]
    );

    const removeUser = useCallback((workspaceId, userId) => {
            workspaceRepository
                .removeUser(workspaceId, userId)
                .then(() => {
                    console.log(`User ${userId} was removed`);
                    fetchWorkspacesByUser()
                })
                .catch((error) => console.error("Error deleting user:", error));
        }, [fetchWorkspacesByUser]
    );


    useEffect(() => {
        if (userId) {
            fetchWorkspacesByUser();
        }
    }, [userId, fetchWorkspacesByUser]);

    return {...state, fetchWorkspacesByUser,createWorkspace, inviteUser, removeUser};

};

export default useWorkspaces;
