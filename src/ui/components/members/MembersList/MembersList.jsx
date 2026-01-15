import React from 'react';
import {Box, Button, IconButton, Stack, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router";

const MembersList = ({ memberIds, users, onRemove, reportOn, modelId }) => {
    const navigate = useNavigate();

    return (
        <Stack spacing={1}>
            {memberIds.map((memberId) => {
                const user = users.find(u => u.id === memberId);
                const name = user ? user.name : memberId;

                return (
                    <Box
                        key={memberId}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: 2,
                            py: 1,
                            bgcolor: '#f9f9f9',
                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body1">{name}</Typography>

                        {onRemove ? (
                            <IconButton
                                size="small"
                                onClick={() => onRemove(user)}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        ) : reportOn ? (
                            <Button
                                onClick={() => navigate(`/report/${memberId}/${modelId}`)}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: "#6d2e46",
                                    color: "#6d2e46",
                                    '&:hover': {
                                        borderColor: "#a26769",
                                        backgroundColor: 'rgba(162, 103, 105, 0.1)',
                                    },
                                }}
                            >
                                View Report
                            </Button>
                        ) : null}
                    </Box>
                );
            })}
        </Stack>
    );
};

export default MembersList;
