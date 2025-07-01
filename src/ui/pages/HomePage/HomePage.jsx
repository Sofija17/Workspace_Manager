import React, {useState} from "react";
import {
    Container,
    Box,
    Button,
    Typography
} from "@mui/material";
import Dashboard from "../../components/dashboard/Dashboard.jsx";
import AddWorkspaceDialog from "../../components/workspace/AddWorkspaceDialog/AddWorkspaceDialog.jsx";
import useWorkspaces from "../../../hooks/useWorkspaces.js";

const HomePage = () => {
    const userId = "user_1";
    const [addWorkspaceDialogOpen, setAddWorkspaceDialogOpen] = useState(false);
    const {workspaces, loading, createWorkspace} = useWorkspaces(userId);


    return (
        <Container maxWidth="lg">
            <Box sx={{py: 5}}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        My Workspaces
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddWorkspaceDialogOpen(true)}
                        sx={{backgroundColor: "#6d2e46"}}
                    >
                        + Create New Workspace
                    </Button>
                </Box>

                <Dashboard workspaces={workspaces} loading={loading}/>

                <AddWorkspaceDialog
                    open={addWorkspaceDialogOpen}
                    onClose={() => setAddWorkspaceDialogOpen(false)}
                    userId={userId}
                    createWorkspace={createWorkspace}
                />
            </Box>
        </Container>
    );
};


export default HomePage;
