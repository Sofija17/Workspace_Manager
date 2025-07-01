import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
    return (
        <AppBar
            position="static"
            elevation={3}
            sx={{ backgroundColor: "#6d2e46" }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Workspace App
                </Typography>


                <Box>
                    <Button color="inherit" sx={{ textTransform: "none", fontWeight: "italic" }}>
                        <PersonIcon></PersonIcon>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
