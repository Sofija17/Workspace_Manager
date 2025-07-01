import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Selector = ({ label, options = [], value, onChange }) => {
    return (
        <FormControl sx={{ minWidth: 200, mb: 3 }}>
            <InputLabel id={`${label}-selector-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-selector-label`}
                value={value}
                label={label}
                onChange={onChange}
            >
                {options.map((option) => {

                    const itemValue = typeof option === 'string' ? option : option.value;
                    const itemLabel = typeof option === 'string'
                        ? option.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())
                        : option.label;

                    return (
                        <MenuItem key={itemValue} value={itemValue}>
                            {itemLabel}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default Selector;
