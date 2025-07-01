import React from "react";
import {useNavigate} from "react-router";
import { Box, Button, Typography} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import useUsers from "../../../../hooks/useUsers.js";

const WorkspaceCard = ({ workspace }) => {
    const navigate = useNavigate();
    const {users} = useUsers();

    const owner = users.find((u) => u.id === workspace.created_by_user_id);
    console.log(owner)

    return (
        <Box
            sx={{
                width: 450,
                boxShadow: 3,
                borderRadius: 2,
                p: 3,
                mb: 2,
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 350,
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {workspace.name}
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                    {workspace.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Workspace Owner : {owner?.name || workspace.created_by_user_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Members: {workspace.members.length}
                </Typography>
            </Box>


            <Button
                variant="contained"
                color="primary"
                startIcon={<InfoIcon/>}
                onClick={() => navigate(`/workspaces/${workspace.id}`)}
                sx={{ alignSelf: 'flex-start', mt: 2 }}
                sx={{ backgroundColor: "#6d2e46" }}
            >
                Details
            </Button>
        </Box>
    );
};

export default WorkspaceCard;
