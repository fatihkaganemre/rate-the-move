import React, { useState } from 'react';

function ToggleSwitch({ optionA = "Option A", optionB = "Option B", onChange }) {
    const [selectedOption, setSelectedOption] = useState(optionA);

    const handleSelect = (option) => {
        setSelectedOption(option);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div style={styles.container}>
            <div
                onClick={() => handleSelect(optionA)}
                style={{
                    ...styles.option,
                    ...(selectedOption === optionA ? styles.selected : styles.notSelected)
                }}
            >
                {optionA}
            </div>
            <div
                onClick={() => handleSelect(optionB)}
                style={{
                    ...styles.option,
                    ...(selectedOption === optionB ? styles.selected : styles.notSelected)
                }}
            >
                {optionB}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        border: '1px solid #ccc',
        borderRadius: '5px',
        overflow: 'hidden',
        width: '200px',
        cursor: 'pointer',
    },
    option: {
        flex: 1,
        padding: '10px',
        textAlign: 'center',
        fontSize: '16px',
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.3s',
    },
    selected: {
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    notSelected: {
        backgroundColor: '#f0f0f0',
        color: '#000',
    }
};

export default ToggleSwitch;
