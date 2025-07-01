import React, {useState} from "react";
import {
    Box,
    Typography,
    Paper,
    Chip,
    LinearProgress,
    Divider,
    Stack,
    CircularProgress,
    Button,
    Link,
    Breadcrumbs,
    TextField,
} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import useModelDetails from "../../../hooks/useModelsDetails.js";
import useUsers from "../../../hooks/useUsers.js";
import MembersList from "../../components/members/MembersList/MembersList.jsx";
import useEvaluations from "../../../hooks/useEvaluations.js";
import AddEvaluationDialog from "../../components/evaluation/AddEvaluationDialog/AddEvaluationDialog.jsx";

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
}


const ModelDetailsPage = () => {
    const {id} = useParams();
    const {model, loading} = useModelDetails(id);
    const {saveEvaluation} = useEvaluations("user_1", model?.model_name)
    const [openEvalDialog, setOpenEvalDialog] = useState(false)
    const {users} = useUsers();
    const navigate = useNavigate();

    const creator = users.find((u) => u.id === model.created_by);

    //Quesrion logic
    const [question, setQuestion] = useState("");
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    const [canEvaluate, setCanEvaluate] = useState(false)


    const handleAskQuestion = () => {
        setLoadingAnswer(true);

        // simulate thinking
        setTimeout(() => {
            setLoadingAnswer(false);

            setQuestion("");
            setCanEvaluate(true)
        }, 2000);

    };


    if (loading || !model) {
        return <CircularProgress/>;
    }


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
                    navigate(`/workspaces/${model.workspace_id}`);
                }}>
                    Workspace
                </Link>
            </Breadcrumbs>

            <Box sx={{maxWidth: 800, mx: "auto", mt: 5}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {model.model_name}
                </Typography>

                <Typography variant="subtitle1" gutterBottom color="text.secondary">
                    {model.description}
                </Typography>

                <Paper elevation={3} sx={{p: 3, mt: 2}}>
                    <Stack spacing={2}>
                        <Typography>
                            <strong style={{marginRight: "5px"}}>Created by:</strong>
                            {creator?.name || model.created_by}
                        </Typography>
                        <Typography><strong>Release Date:</strong> {model.release_date}</Typography>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography><strong>Status:</strong></Typography>
                            <Chip
                                label={model.status}
                                sx={{backgroundColor: getStatusProps(model.status).bgColor, color: "#fff"}}
                            />
                        </Stack>

                        <Box>
                            <Typography><strong>Evaluation Progress:</strong></Typography>
                            <LinearProgress variant="determinate" value={model.evaluation_progress}  sx={{
                                mt: 1,
                                height: 5,
                                borderRadius: 2,
                                backgroundColor: '#f0f0f0', // Track color
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#a26769', // Progress bar color
                                },
                            }}/>
                            <Typography variant="body2" color="text.secondary">{model.evaluation_progress}%
                                completed</Typography>
                        </Box>

                        <Box>
                            <Typography sx={{mb: 2}}><strong>Evaluated by:</strong></Typography>
                            <MembersList
                                users={users}
                                memberIds={model.evaluated_by}
                                reportOn={true}
                                modelId={model.id}
                            />
                        </Box>

                    </Stack>

                    <Divider sx={{my: 2}}/>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Ask a question to the model
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={5}
                            placeholder="Type your question here..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={loadingAnswer}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    color: '#6d2e46',
                                    '& fieldset': {
                                        borderColor: '#6d2e46',
                                    },
                                },
                            }}
                        />

                        {loadingAnswer ? (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <CircularProgress size={20}/>
                                <Typography variant="body2" color="text.secondary">Thinking...</Typography>
                            </Stack>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleAskQuestion}
                                disabled={!question.trim()}
                                sx = {{ backgroundColor: "#6d2e46"}}
                            >
                                Ask model
                            </Button>
                        )}


                    </Box>

                    {canEvaluate && (
                        <Button
                            variant="contained"
                            onClick={() => setOpenEvalDialog(true)}
                            sx = {{ backgroundColor: "#6d2e46", mt: 2}}
                        >
                            Evaluate Answer
                        </Button>
                    )}

                </Paper>

                <AddEvaluationDialog
                open={openEvalDialog}
                onClose={() => setOpenEvalDialog(false)}
                saveEval={saveEvaluation}>

                </AddEvaluationDialog>

                <Button variant="text" onClick={() => navigate(-1)}
                        sx={{mt: 3, mb:3,
                            borderColor: "#6d2e46",          // outline border
                            color: "#6d2e46",                // text color
                            '&:hover': {
                                borderColor: "#a26769",
                                backgroundColor: 'rgba(162, 103, 105, 0.1)', // matching hover tint
                            },}}>
                    ← Back
                </Button>


            </Box>
        </>
    );
};

export default ModelDetailsPage;
