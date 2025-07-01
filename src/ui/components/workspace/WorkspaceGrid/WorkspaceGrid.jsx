    import React from "react";
import { Grid } from "@mui/material";
import WorkspaceCard from "../WorkspaceCard/WorkspaceCard.jsx";

const WorkspaceGrid = ({ workspaces }) => {
    return (
        <Grid container spacing={2}>
            {workspaces.map((ws) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={ws.id}>
                    <WorkspaceCard workspace={ws}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default WorkspaceGrid;
