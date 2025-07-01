import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 3,
                mt: "auto",
                backgroundColor: "grey.200",
                textAlign: "center",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © 2025 WorskapceApp. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
