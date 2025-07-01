import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField
} from "@mui/material";

import useUsers from "../../../../hooks/useUsers.js";


const initialFormData = {
    name: "",
    members: [],
};


const AddWorkspaceDialog = ({ open, onClose, userId, createWorkspace }) => {
    const [formData, setFormData] = useState(initialFormData);
    const { users } = useUsers();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const finalMembers = [...formData.members, userId];
        createWorkspace(formData.name, finalMembers, userId);
        setFormData(initialFormData);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Invite Members</InputLabel>
                    <Select
                        multiple
                        name="members"
                        value={formData.members}
                        onChange={handleChange}
                        label="Invite Members"
                        renderValue={(selected) =>
                            selected.map((id) => {
                                const user = users.find((u) => u.id === id);
                                return user ? user.name : id;
                            }).join(", ")
                        }
                    >
                        {users
                            .filter((user) => user.id !== userId) //don't show current user
                            .map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Create</Button>
            </DialogActions>
        </Dialog>
    );
};


export default AddWorkspaceDialog;