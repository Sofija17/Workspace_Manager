import React from "react";
import ModelCard from "../ModelCard/ModelCard.jsx";
import { Grid } from "@mui/material";

const ModelGrid = ({ models, onDelete }) => {
    return (
        <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            sx={{ width: "100%", margin: 0 }}
        >
            {models.map((model) => (
                <Grid item xs={12} sm={6} md={3} key={model.id}>
                    <ModelCard model={model} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ModelGrid;

