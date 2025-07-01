import React, {useEffect, useState} from 'react';
import fields from "../../../mock/fields.json";
import domains from "../../../mock/domains.json";
import Selector from "../../components/metrics/MetricSelector/Selector.jsx"
import GroupedBarChart from "../../components/charts/GroupedBarChart.jsx";
import {Box, Typography, Divider} from "@mui/material";
import BarChartByMetric from "../../components/charts/BarChartByMetric.jsx";
import useEvaluationsByWorkspace from "../../../hooks/useEvaluationsByWorkspace.js";
import BoxPlotByMetric from "../../components/charts/BoxPlotByMetric.jsx";
import GroupedBarChartByMetricType from "../../components/charts/GroupedBarChartByMetricType.jsx";

const EXCLUDED_KEYS = ["question_id", "model_name", "username", "comment", "workspace_id"];


const ModelStatisticsByWorkspace = ({workspaceId}) => {
    const [groupedMetric, setGroupedMetric] = useState("understanding");
    const [singleMetric, setSingleMetric] = useState("understanding");
    const [selectedField, setSelectedField] = useState("")
    const [boxMetric, setBoxMetric] = useState("understanding")

    useEffect(() => {
        if (workspaceId === "ws_001") {
            setSelectedField("F1");
        } else {
            setSelectedField("F5");
        }
    }, [workspaceId]);

    const filteredEvaluations = useEvaluationsByWorkspace(workspaceId);


    const allMetricsKeys = filteredEvaluations.length > 0 ? Object.keys(filteredEvaluations[0]) : [];
    const metricKeys = allMetricsKeys.filter(k => !EXCLUDED_KEYS.includes(k));


    const fieldIdMapByWorkspace = {
        ws_001: ["F1", "F2", "F3", "F4"],
        ws_002: ["F5", "F6", "F7", "F8"]
    };

    const domainIdMapByWorkspace = {
        ws_001: ["D1", "D2", "D3", "D4"],
        ws_002: ["D5", "D6", "D7", "D8", "D9", "D10"]
    };

    const fieldOptions = fields
        .filter(f => fieldIdMapByWorkspace[workspaceId]?.includes(f.field_id))
        .map(f => ({
            value: f.field_id,
            label: f.field_text
        }));

    const domainOptions = domains
        .filter(d => domainIdMapByWorkspace[workspaceId]?.includes(d.domain_id))
        .map(d => ({
            value: d.domain_id,
            label: d.domain_text
        }));


    return (
        <>
            <Box sx={{
                flexGrow: 1,
                px: {xs: 2, sm: 4, md: 8},
                py: 5,
            }}>
                <Selector
                    label="Select Metric"
                    options={metricKeys}
                    value={groupedMetric}
                    onChange={(e) => setGroupedMetric(e.target.value)}
                />

                <Selector

                    label="Select Field"
                    options={fieldOptions}
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                />

                <Typography variant='h6' textAlign="center">
                    <strong>
                        {groupedMetric.charAt(0).toUpperCase() + groupedMetric.slice(1)}
                    </strong>
                    {" "} by Domain in Field:{" "}
                    <strong>
                        {fieldOptions.find(f => f.value === selectedField)?.label || "—"}
                    </strong>
                </Typography>

                <GroupedBarChart
                    selectedField={selectedField}
                    selectedMetric={groupedMetric}
                    data={filteredEvaluations}
                    domains={domainOptions}>

                </GroupedBarChart>
            </Box>
            <Divider/>
            <Box sx={{
                flexGrow: 1,
                px: {xs: 2, sm: 4, md: 8},
                py: 5
            }}>

                <Selector
                    label="Select Metric"
                    options={metricKeys}
                    value={singleMetric}
                    onChange={(e) => setSingleMetric(e.target.value)}
                />
                <Typography variant='h6' textAlign="center">
                    Average <strong>{singleMetric}</strong> by model:
                </Typography>
                <BarChartByMetric
                    onChange={(e) => setSingleMetric(e.target.value)}
                    selectedMetric={singleMetric}
                    data={filteredEvaluations}/>
            </Box>
            <Divider/>

            <Box sx={{
                flexGrow: 1,
                px: {xs: 2, sm: 4, md: 8},
                py: 5
            }}>
                <Typography variant="h6" textAlign="center">
                    Average score of <strong>positive</strong> and <strong>negative</strong> metrics by model:
                </Typography>

                <GroupedBarChartByMetricType
                    data={filteredEvaluations}>
                </GroupedBarChartByMetricType>

            </Box>
            <Divider/>
            <Box sx={{
                flexGrow: 1,
                px: {xs: 2, sm: 4, md: 8},
                py: 5
            }}>
                <Selector
                    label="Select Metric"
                    options={metricKeys}
                    value={boxMetric}
                    onChange={(e) => setBoxMetric(e.target.value)}
                />
                <Typography variant='h6' textAlign="center">
                    Distribution of <strong>{boxMetric}</strong> by model:
                </Typography>
                <BoxPlotByMetric selectedMetric={boxMetric}
                                 data={filteredEvaluations}/>

            </Box>
        </>
    );
};

export default ModelStatisticsByWorkspace;