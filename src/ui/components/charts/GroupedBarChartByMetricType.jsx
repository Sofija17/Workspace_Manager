import React from 'react';
import models from "../../../mock/models.json";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList} from "recharts";

const POSITIVE_METRICS = [
    "accuracy", "clarity", "reasoning", "relevance",
    "comprehensiveness", "currency", "understanding", "empathy"
];

const NEGATIVE_METRICS = [
    "bias", "harm", "fabrication", "falsification", "plagiarism"
];

const GroupedBarChartByMetricType = ({data}) => {

    const modelAndDate = Object.fromEntries(models.map(m => [m.model_name, m.release_date]));

    const modelStats = {};
    data.forEach(e => {
        const model = e.model_name;


        if(!modelStats[model]){
            modelStats[model] = {
                positive: {total:0, count:0},
                negative: {total:0, count:0}
            };
        }

        POSITIVE_METRICS.forEach(metric =>{
            if(e[metric] !== undefined){
                modelStats[model].positive.total += e[metric];
                modelStats[model].positive.count +=1;
            }
        })

        NEGATIVE_METRICS.forEach(metric => {
            if(e[metric] !== undefined){
                modelStats[model].negative.total += e[metric];
                modelStats[model].negative.count += 1;
            }
        });

    });

    const chartData = Object.entries(modelStats).map(([model, stats]) => {
        const positiveAvg = +(stats.positive.total/stats.positive.count).toFixed(2)
        const negativeAvg = +(stats.negative.total/stats.negative.count).toFixed(2)

        return {
            model : `${model} (${modelAndDate[model] || " "})`,
            positive: positiveAvg,
            negative: negativeAvg
        };
    })

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{ top: 20, bottom: 60, left: 30, right: 30 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="model"
                    angle={-30}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 9 }}
                />
                <YAxis
                    label={{
                        value: `Average score`,
                        angle: -90,
                        position: 'insideLeft'
                    }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="positive" fill="#81c784" name={"Positive Metrics"}>
                    <LabelList dataKey="positive" position="top" fontSize={12} />
                </Bar>
                <Bar dataKey="negative" fill="#ef5350" name={"Negative Metrics"}>
                    <LabelList dataKey="negative" position="top" fontSize={12} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GroupedBarChartByMetricType;