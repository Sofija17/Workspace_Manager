import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    LabelList
} from "recharts";


const BarChartByMetric = ({selectedMetric, data}) => {
    //da prikazhe average metric za sekoj model razlichen bar
    // data = {
    //     model: ""
    //     metric_avg: ""
    // }

    //od sekoja evaluacija da go zemam model name i vrednosta za izbranata metrika
    const modelMetricMap = {};

    data.forEach(e => {
        const model = e.model_name;
        const metric = e[selectedMetric]

        if (!modelMetricMap[model]) { //inicijalizaci
            modelMetricMap[model] = {total: 0, count: 0}
        }
        //  Gemini: { total: 8.0, count: 2 },

        modelMetricMap[model].total += metric;
        modelMetricMap[model].count += 1;
    })

    const chartData = Object.entries(modelMetricMap).map(([model, {total, count}]) => ({
        // object entries:  ["Gemini", { total: 8.0, count: 2 }],
        //.map():  { model: "Gemini", value: 4.00 },
        model,
        value: +(total / count).toFixed(2),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{top: 20, right: 30, left: 30, bottom: 60}}
            >
                <CartesianGrid strokeDasharray="1 1"/>
                <XAxis
                    dataKey="model"
                    angle={-30}
                    textAnchor="end"
                    height={70}
                    tick={{fontSize: 12}}
                />
                <YAxis
                    label={{
                        value: `Average ${selectedMetric.replace(/_/g, " ")}`,
                        angle: -90,
                        position: 'insideLeft',
                        fontSize: 14,
                    }}
                />
                <Tooltip/>

                <Bar dataKey="value" fill="#e15759">
                    <LabelList dataKey="value" position="top" fontSize={12}/>
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartByMetric;