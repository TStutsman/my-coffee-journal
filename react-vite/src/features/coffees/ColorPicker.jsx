import './ColorPicker.css';

export default function ColorPicker({ setColor }) {

    const options = ['red', 'pink', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown'];

    return (
        <div id='color-picker'>
            { options.map(color => <PickColor key={color} color={color} pickColor={setColor} />) }
        </div>
    )
}

function PickColor({ color, pickColor }) {
    return(
        <span 
        className='pick-color'
        style={{backgroundColor: `var(--${color})`}}
        onClick={() => pickColor(color)}
        >
        </span>
    )
}