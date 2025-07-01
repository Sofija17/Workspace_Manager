import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./ui/components/dashboard/Dashboard.jsx";
import Layout from "./ui/components/layout/Layout/Layout.jsx";
import WorkspaceDetailsPage from "../src/ui/pages/WorkspaceDetailsPage/WorkspaceDetailsPage.jsx"
import HomePage from "./ui/pages/HomePage/HomePage.jsx"
import ModelDetailsPage from "./ui/pages/ModelDetailsPage/ModelDetailsPage.jsx";
import ReportDetailsPage from "./ui/pages/ReportDetailsPage/ReportDetailsPage.jsx";
import ModelStatisticsByWorkspace from "./ui/pages/ModelStatisticsByWorkspace/ModelStatisticsByWorkspace.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    <Route path="dashboard" element={<HomePage />} />
                    <Route path="/workspaces/:id" element={<WorkspaceDetailsPage/>} />
                    <Route path="/models/:id" element={<ModelDetailsPage />} />
                    <Route path="/report/:userId/:modelId" element={<ReportDetailsPage/>}/>

                    <Route path="/model/statistics" element={<ModelStatisticsByWorkspace/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;