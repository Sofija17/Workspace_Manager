import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField,
} from "@mui/material";
import useUsers from "../../../../hooks/useUsers.js";
import useWorkspaces from "../../../../hooks/useWorkspaces.js";


const initialFormData = {
    "user": ""
};

const AddMemberDialog = ({open, onClose, workspaceId, currentMemberIds, onUserAdded}) => {
    const [formData, setFormData] = useState(initialFormData);
    const {users} = useUsers();
    const {inviteUser} = useWorkspaces()


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        const addedUser = users.find((u) => u.id === formData.user);
        inviteUser(workspaceId, formData.user);

        if (onUserAdded) {
            onUserAdded(addedUser?.name || 'User');
        }

        setFormData(initialFormData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>Add New Member</DialogTitle>
            <DialogContent>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Users</InputLabel>
                    <Select
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        label="User"
                        variant="outlined">
                        {users
                            .filter((user) => !currentMemberIds.includes(user.id))
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
                <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
            </DialogActions>


        </Dialog>


    );
};

export default AddMemberDialog;