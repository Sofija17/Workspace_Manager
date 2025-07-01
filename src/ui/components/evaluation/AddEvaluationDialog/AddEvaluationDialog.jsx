import React, {useState} from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select, Box, Typography
} from "@mui/material";


const initialFormData = {
    "Comment": "",
    "Accuracy": "",
    "Comprehensiveness": "",
    "Clarity": "",
    "Empathy": "",
    "Bias": "",
    "Harm": "",
    "Relevance": "",
    "Currency": "",
    "Understanding": "",
    "Reasoning": "",
    "Factuality verification": "",
    "Fabrication": "",
    "Falsification": "",
    "Plagiarism": ""
};

const METRICS = [
    "Accuracy", "Comprehensiveness", "Clarity", "Empathy",
    "Bias", "Harm", "Relevance", "Currency", "Understanding",
    "Reasoning", "Factuality verification", "Fabrication",
    "Falsification", "Plagiarism"
];


const AddEvaluationDialog = ({open, onClose, saveEval}) => {
    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };


    const handleSubmit = () => {
        // povikaj metod od hook preky prop
        saveEval(formData)
        onClose();
        console.log("Form data saved:", formData);


    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>Evaluate Answer</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {METRICS.map((metric) => (
                            <TextField
                                key={metric}
                                label={metric}
                                name={metric}
                                type="number"
                                inputProps={{ step: 0.1, min: 0, max: 5 }}
                                value={formData[metric]}
                                onChange={handleChange}
                                fullWidth
                            />
                        ))}

                        <TextField
                            label="Comment"
                            name="Comment"
                            value={formData.Comment}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>

                    <Button sx={{ mt: 2 ,backgroundColor: "#6d2e46"}} variant="contained" fullWidth onClick={handleSubmit}>
                        Add
                    </Button>
                </DialogContent>


            </Dialog>

        </>
    );
};

export default AddEvaluationDialog;