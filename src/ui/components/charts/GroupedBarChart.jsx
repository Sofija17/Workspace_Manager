import React from 'react';
import questions from "../../../mock/questions.json";
import models from "../../../mock/models.json";
import {
    ResponsiveContainer, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const getColor = (id) => {
    // const colors = ['#ef476f', '#f2ea9d', '#95f0ea', '#94d2bd', '#f2b3c3' ,'#fcd5ce'];
    const colors = [
        '#4e79a7', // blue
        '#f28e2b', // orange
        '#e15759', // red
        '#76b7b2', // teal
        '#59a14f', // green
        '#edc949'  // yellow
    ];
    const index = parseInt(id.replace(/\D/g, '')) || 0;
    return colors[index % colors.length];
};


const GroupedBarChart = ({selectedField, selectedMetric, data, domains}) => {

    //mapiranje na selectedField.value so fieldId vo questions
    //gi cuva site prasanja od toj izbran field
    const questionsForField = questions.filter(q => q.field_id === selectedField);

    // mapiranje na prasanjata so domain na koj se odnesuvaat
    // set od: question_id → domain_id   Q9 = D6
    const questionIdToDomainId = questionsForField.reduce((acc, q) => {
        acc[q.question_id] = q.domain_id; //
        return acc;
    }, {});

    const domainIdToLabel = {};

    domains.forEach(d => {
        domainIdToLabel[d.value] = d.label;
        //D6 = Imeto na domain
    });


    //zemanje na evaluaciite so gi sodrzat odbranite prasanja
    const allowedQuestionIds = Object.keys(questionIdToDomainId);
    const evaluationsForField = data.filter(e => allowedQuestionIds.includes(e.question_id));
    console.log("evaluationsForField", evaluationsForField);

    //mapa od model name : release date
    const modelAndDate = models.reduce((acc, m) => {
        acc[m.model_name] = m.release_date;
        return acc;
    }, {})

    // Aggregate metric per model + domain
    const grouped = {};

    evaluationsForField.forEach(e => {
        const model = e.model_name;
        const domainId = questionIdToDomainId[e.question_id];
        const domainLabel = domainIdToLabel[domainId];
        const value = e[selectedMetric];

        if (!grouped[model]) grouped[model] = {};
        if (!grouped[model][domainLabel]) grouped[model][domainLabel] = {total: 0, count: 0};

        grouped[model][domainLabel].total += value;
        grouped[model][domainLabel].count += 1;
    });


// build chartData
    const chartData = Object.entries(grouped).map(([model, domainData]) => {
        const entry = {
            model: `${model} (${modelAndDate[model] || ''})`
        };
        for (const [domainLabel, {total, count}] of Object.entries(domainData)) {
            entry[domainLabel] = +(total / count).toFixed(2);
        }
        return entry;
    });


    return (
        <ResponsiveContainer width="100%" height={400}>

            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="model"
                    angle={-30}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 9 }}/>
                <YAxis
                    label={{
                        value: `Average ${selectedMetric.replace(/_/g, " ")}`,
                        angle: -90,
                        position: 'insideLeft'
                    }}
                />
                <Tooltip />
                <Legend/>

                {domains.map(d => (
                    <Bar
                        key=    {d.label}
                        dataKey={d.label}
                        fill={getColor(d.value)}
                    />
                ))}
            </BarChart>

        </ResponsiveContainer>
    );
};

export default GroupedBarChart;