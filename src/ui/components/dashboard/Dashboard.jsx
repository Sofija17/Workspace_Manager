import React from "react";
import {
    Box,
    Typography,
    CircularProgress
} from "@mui/material";
import WorkspaceGrid from "../workspace/WorkspaceGrid/WorkspaceGrid.jsx";


const Dashboard = ({ workspaces, loading }) => {

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "30vh"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
            {workspaces.length > 0 ? (
                <WorkspaceGrid workspaces={workspaces} />
            ) : (
                <Typography variant="body1" color="text.secondary">
                    You haven't joined or created any workspaces yet.
                </Typography>
            )}
        </Box>
    );
};

export default Dashboard;
