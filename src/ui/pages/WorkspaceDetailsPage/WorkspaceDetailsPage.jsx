import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Divider,
    Button,
    Breadcrumbs,
    Link,
    Snackbar,
    Alert, Paper

} from "@mui/material";
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import useWorkspaceDetails from "../../../hooks/useWorkspaceDetails.js";
import useUsers from "../../../hooks/useUsers.js";
import useModels from "../../../hooks/useModels.js";
import MembersList from "../../components/members/MembersList/MembersList.jsx";
import ModelGrid from "../../components/models/ModelGrid/ModelGrid.jsx";
import AddMemberDialog from "../../components/members/AddMemberDialog/AddMemberDialog.jsx";
import {useNavigate} from "react-router";
import useWorkspaces from "../../../hooks/useWorkspaces.js";
import AddModelDialog from "../../components/models/AddModelDialog/AddModelDialog.jsx";
import ModelStatisticsByWorkspace from "../ModelStatisticsByWorkspace/ModelStatisticsByWorkspace.jsx";

const WorkspaceDetailsPage = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const {workspace, loading, error} = useWorkspaceDetails(id);
    const {users} = useUsers();
    const {models, addModel, deleteModel} = useModels(id);
    const {removeUser} = useWorkspaces()

    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false)
    const [addModelDialogOpen, setAddModelDialogOpen] = useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [modelToDelete, setModelToDelete] = useState(null);

    const handleRemoveUser = (user) => {
        removeUser(workspace.id, user.id);
        setSnackbarMessage(`${user.name} was removed from the workspace`);
        setSnackbarOpen(true);
    }


    const owner = users.find((u) => u.id === workspace.created_by_user_id);

    if (loading) {
        return (
            <Box sx={{p: 4}}>
                <Typography variant="h4">Loading...</Typography>
            </Box>
        );
    }

    if (error || !workspace) {
        return (
            <Box sx={{p: 4}}>
                <Typography variant="h4" color="error">Workspace not found</Typography>
            </Box>
        );
    }

    const handleDeleteModel = (modelId) => {
        setModelToDelete(modelId)

    }

    console.log(models);

    return (

        <>

            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button size="small" variant="contained" sx={{mt: 2, mb: -5, backgroundColor: "#6d2e46"}}
                        onClick={() => setAddModelDialogOpen(true)}

                >+ Add new model</Button>
            </Box>


            <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3, mt: 3}}>
                <Link
                    underline="hover"
                    color="inherit"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                >
                    Dashboard
                </Link>
                <Typography color="text.primary">{workspace.name}</Typography>
            </Breadcrumbs>


            <Paper sx={{ bgcolor: '#f9f9f9',
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 2,
                boxShadow: 3,
                mb: 4}}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{mt: 2, mb: 4, fontWeight: "bold"}}
                >
                    {workspace.name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{mt: 2, mb: 4,}}
                >
                    {workspace.description}
                </Typography>
                <Typography
                    variant="body2"
                    fontStyle="italic"
                    sx={{mb: 4, mt: -2}}
                > Created by:{" "}
                    {owner.name}
                </Typography>


                <Box sx={{ width: '100%', paddingX: 1, paddingBottom: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Models evaluated:
                    </Typography>
                    <ModelGrid models={models} onDelete={handleDeleteModel} />
                </Box>

            </Paper>

            {/*Charts */}

            <ModelStatisticsByWorkspace
                workspaceId={id}></ModelStatisticsByWorkspace>

            {/*Members Section*/}

            <Typography variant="h5" gutterBottom>
                Workspace Members:
            </Typography>
            <Box sx={{mb: 2, mt: 2}}>
                <MembersList
                    users={users}
                    memberIds={workspace.members}
                    onRemove={handleRemoveUser}
                />
                <Button
                    variant="contained"
                    size="small"
                    sx={{mt: 2, backgroundColor: "#6d2e46"}}
                    onClick={() => setAddMemberDialogOpen(true)}

                >
                    + Add Member
                </Button>
            </Box>


            <AddMemberDialog
                open={addMemberDialogOpen}
                onClose={() => setAddMemberDialogOpen(false)}
                workspaceId={workspace.id}
                currentMemberIds={workspace.members}
                onUserAdded={(name) => {
                    setSnackbarMessage(`${name} was added to the workspace`);
                    setSnackbarOpen(true);
                }}
            >
            </AddMemberDialog>

            <AddModelDialog
                open={addModelDialogOpen}
                onClose={() => setAddModelDialogOpen(false)}
                workspaceId={workspace.id}
                userId={owner?.id}
                addModelToWorkspace={addModel}
            >
            </AddModelDialog>

            <Dialog
                open={Boolean(modelToDelete)}
                onClose={() => setModelToDelete(null)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this model and all its data? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModelToDelete(null)}>Cancel</Button>
                    <Button
                        onClick={() => {
                            deleteModel(modelToDelete);
                            setModelToDelete(null);
                            setSnackbarMessage("Model deleted");
                            setSnackbarOpen(true);
                        }}
                        autoFocus
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{width: '100%'}}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                    mt: 3, mb: 3,
                    borderColor: "#6d2e46",
                    color: "#6d2e46",
                    '&:hover': {
                        borderColor: "#a26769",
                        backgroundColor: 'rgba(162, 103, 105, 0.1)',
                    },
                }}
            >
                ← Back
            </Button>

        </>
    );


};

export default WorkspaceDetailsPage;

