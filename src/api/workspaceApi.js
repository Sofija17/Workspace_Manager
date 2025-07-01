//fake api
import mockData from "../mock/workspaces.json"

//kloniranje na originalniot JSON objekt vo nova promenliva
//za da mozheme da go menuvame bez da go ostetime, izmenime originalniot fajl

let memoryWorkspaces = [...mockData]

//filter vrkaja niza
export const fetchWorkspacesByUser = async (userId) => {
    return memoryWorkspaces.filter((ws) => ws.members.includes(userId));
}
//find vrakja eden objekt
export const fetchWorkspaceById = async (workspaceId) => {
    return memoryWorkspaces.find((ws) => ws.id === workspaceId);
}

export const createWorkspace = async (name, userId, members = []) => {
    const new_ws = {
        id: "ws_" + Math.random().toString(36).substring(2, 5),
        name,
        created_by_user_id: userId,
        members: members.includes(userId) ? members : [userId, ...members] // just in case
    };
    memoryWorkspaces.push(new_ws);
    return new_ws;
};




export const removeUserFromWorkspace = async (workspaceId, userId) => {
    const ws = memoryWorkspaces.find((workspace) => workspace.id === workspaceId);

    if (ws && ws.members.includes(userId)) {
        ws.members = ws.members.filter((id) => id !== userId);
    }
    return ws;

}

export const inviteUserToWorkspace = async (workspaceId, userId) => {

    const ws = memoryWorkspaces.find((workspace) => workspace.id === workspaceId);

    if(ws && !ws.members.includes(userId)){
        ws.members.push(userId);
    }
    return ws;
};

