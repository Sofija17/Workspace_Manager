import React, {useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {
    CircularProgress,
    Box,
    Typography,
    Paper,
    LinearProgress,
    Breadcrumbs,
    Link,
    Button
} from "@mui/material";
import useEvaluations from "../../../hooks/useEvaluations.js";
import useUsers from "../../../hooks/useUsers.js";
import useModels from "../../../hooks/useModels.js";

const ReportDetailsPage = () => {
    const navigate = useNavigate();
    const {userId, modelId} = useParams();


    const {evaluation, fetchForReportByUserIdAndModelId} = useEvaluations(userId, modelId);
    const {users} = useUsers();

    const {models} = useModels(evaluation?.workspace_id);

    useEffect(() => {
        if (userId && modelId) {
            fetchForReportByUserIdAndModelId(userId, modelId);
        }
    }, [userId, modelId, fetchForReportByUserIdAndModelId]);


    if (evaluation?.loading || !evaluation) {
        return (
            <Box sx={{mt: 5, textAlign: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    }

    console.log("DEBUG ", evaluation)

    const user = users.find((u) => u.id === evaluation.user_id);
    const model = models.find((m) => m.id === evaluation.model_id);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{mb: 3, mt: 5}}>
                <Link underline="hover" color="inherit" href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                }}>
                    Dashboard
                </Link>
                <Link underline="hover" color="inherit" href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/workspaces/${evaluation.workspace_id}`);
                }}>
                    Workspace
                </Link>
                <Link underline="hover" color="inherit" href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/models/${evaluation.model_id}`);
                }}>
                    Model details
                </Link>
            </Breadcrumbs>

            <Box sx={{maxWidth: 600, mx: 'auto', mt: 5}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Evaluation Report
                </Typography>

                <Paper elevation={3} sx={{p: 4, borderRadius: 3}}>
                    <Box sx={{mb: 2}}>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>User:</strong> {user?.name || evaluation.user_id}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Model:</strong> {model?.model_name || evaluation.model_id}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Total Questions:</strong> {evaluation.total_questions}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Answered Questions:</strong> {evaluation.answered_questions}
                        </Typography>
                    </Box>

                    <Box sx={{mt: 3}}>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Progress</strong>
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={evaluation.progress}
                            sx={{
                                height: 12, borderRadius: 6,

                                backgroundColor: '#f0f0f0', // Track color
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#d5b9b2', // Progress bar color
                                },
                            }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                            {evaluation.progress}% completed
                        </Typography>
                    </Box>
                </Paper>

                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{mt: 3}}
                >
                    ← Back
                </Button>
            </Box>
        </>
    );
};

export default ReportDetailsPage;
