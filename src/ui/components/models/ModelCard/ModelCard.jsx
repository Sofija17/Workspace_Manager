import React from "react";
import {
    Box,
    Typography,
    Button,
    LinearProgress,
    Chip,
    Stack,
    Paper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import {useNavigate} from "react-router";

const getStatusProps = (status) => {
    switch (status) {
        case "completed":
            return {
                bgColor: "#81c784",

            };
        case "in_progress":
            return {
                bgColor: "#ffb74d",

            };
        case "failed":
            return {
                bgColor: "#e57373",

            };
        default:
            return {
                bgColor: "#e0e0e0",
            };
    }
};


const ModelCard = ({model, onDelete}) => {
    const {bgColor} = getStatusProps(model.status);
    const navigate = useNavigate();

    return (
        <Paper
            elevation={3}
            sx={{
                width: 240,
                p: 2,
                borderRadius: 2,
                bgcolor: "#fff",
                transition: "transform 0.2s, box-shadow 0.2s",
                '&:hover': {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "180px"
            }}
        >
            <IconButton
                size="small"
                onClick={() => onDelete(model.id)}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                        backgroundColor: 'rgba(255,0,0,0.1)',
                    }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            {/* Header Row */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" gap={1}>
                    <ModelTrainingIcon fontSize="small"/>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        fontSize={15}
                        sx={{wordBreak: "break-word"}}
                    >
                        {model.model_name}
                    </Typography>
                </Stack>
                <Chip
                    label={model.status.replace("_", " ")}
                    size="small"
                    sx={{
                        backgroundColor: bgColor,
                        color: "#fff",
                        fontWeight: 500
                    }}
                />

            </Stack>

             {/*Progress Section*/}
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Evaluation Progress: {model.evaluation_progress || 0}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={model.evaluation_progress || 0}
                    sx={{
                        height: 5,
                        borderRadius: 2,
                        backgroundColor: '#f0f0f0', // Track color
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#a26769', // Progress bar color
                        },
                    }}
                />
            </Box>


            <Box sx={{mt: "auto", pt: 2}}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate(`/models/${model.id}`)}
                    sx={{
                        borderColor: "#6d2e46",          // outline border
                        color: "#6d2e46",                // text color
                        '&:hover': {
                            borderColor: "#a26769",
                            backgroundColor: 'rgba(162, 103, 105, 0.1)', // matching hover tint
                        },
                    }}

                >
                    View Details
                </Button>
            </Box>
        </Paper>
    );
};

export default ModelCard;
