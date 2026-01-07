import { useMemo, useState } from 'react';
import './Range.css';

function Range({min=0, max=100, step=1, id, value, onChange}) {
    // useState does not change on prop updates (wont re-initialize when 'value' updates)
    const [progress, setProgress] = useState((value/max * 94) + 3); // progress expressed as %
    const [color, setColor] = useState('var(--text-3)');
    const [displayValue, setDisplayValue] = useState(value);

    const updateRange = (e) => {
        setDisplayValue(e.target.value);
        setProgress((e.target.value/max * 94) + 3);

        // Value rounded to nearest 'step' is passed to parent
        const roundedValue = Math.round(e.target.value / step) * step;
        const updatedEvent = {...e, target: {...e.target, value: roundedValue}}
        onChange(updatedEvent);
    }

    function onMouseUp(e) {
        const roundedValue = Math.round(e.target.value / step) * step;
        setDisplayValue(roundedValue);
        setProgress((roundedValue/max * 94) + 3);
        setColor('var(--text-3)');
    }

    return (
        <input 
        type="range" 
        id={id}
        min={min} 
        max={max}
        step={(max-min)/100}
        value={displayValue}
        onChange={updateRange}
        onMouseDown={() => setColor('var(--text-1)')}
        onMouseUp={onMouseUp}
        style={{
            background: `linear-gradient(to right, ${color} ${progress}%, var(--dp-00) ${progress}%)`
        }}
        />
    )
}

export default Range;