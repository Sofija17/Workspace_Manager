import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Stack,
    IconButton,
    Typography,
    Divider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const initialFormData = {
    workspace_id: "",
    model_name: "",
    description: "",
};

const AddModelDialog = ({ open, onClose, addModelToWorkspace, workspaceId, userId }) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // console.log("SUBMIT DEBUG:", {
        //     workspaceId,
        //     modelName: formData.name,
        //     userId,
        //     options: {
        //         description: formData.description,
        //         architecture: formData.architecture,
        //         visible: formData.visible,
        //         metrics: formData.metrics
        //     }
        // });

        addModelToWorkspace(
            formData.model_name,
            userId,
            {
                description: formData.description,
            }
        );

        // console.log(formData.name);

        setFormData(initialFormData);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Model</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Model Name"
                    name="model_name"
                    value={formData.model_name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    label="Short description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} sx={{color:"#6d2e46" }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary"
                sx={{backgroundColor: "#6d2e46"}}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddModelDialog;
