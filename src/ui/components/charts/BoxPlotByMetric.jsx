import React from 'react';
import Plot from 'react-plotly.js';

const colors = [
    "#42a5f5", "#66bb6a", "#ef5350", "#ab47bc", "#ffa726", "#26c6da", "#6d2e46", "#ea638c"
];

const BoxPlotByMetric = ({selectedMetric, data}) => {


    const modelToValues = {};

    data.forEach(e => {
        const model = e.model_name;
        const value = e[selectedMetric];
        if (!modelToValues[model]) modelToValues[model] = [];
        if (typeof value === "number") modelToValues[model].push(value);
    });

    const traces = Object.entries(modelToValues).map(([model, values], index) => ({
        y: values,
        type: "box",
        name: model,
        boxpoints: "outliers",
        line: { width: 2 },
        width: 0.4,
        fillcolor: colors[index % colors.length] + 50,
        marker: {
            color: colors[index % colors.length]
        }
    }));

    return (
        <Plot
            data={traces}
            layout={{
                title: `Box Plot for ${selectedMetric.replace(/_/g, " ").toUpperCase()}`,
                yaxis: { title: selectedMetric },
                boxmode: "group",
                margin: { t: 40, l: 50, r: 20, b: 70 }
            }}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default BoxPlotByMetric;