import React from 'react';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ maxWidth: '1200px', width: '100%' }}>
                    <Outlet />
                </Box>
            </Box>


            <Footer />
        </Box>
    );
};

export default Layout;
