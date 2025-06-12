import './ColorPicker.css';

export default function ColorPicker({ setColor }) {

    const colors = {
        1: '#9e4d4d',
        2: '#aa6f22',
        3: '#4f8850',
        4: '#61b0af',
        5: '#2d4772',
        6: '#6c4d81'
    }

    const pickColor = (id) => {
        setColor(colors[id])
    }

    return (
        <div id='color-picker'>
            <span>Card Color: </span>
            <span className='pick-color' style={{backgroundColor: colors[1]}} onClick={() => pickColor(1)}></span>
            <span className='pick-color' style={{backgroundColor: colors[2]}} onClick={() => pickColor(2)}></span>
            <span className='pick-color' style={{backgroundColor: colors[3]}} onClick={() => pickColor(3)}></span>
            <span className='pick-color' style={{backgroundColor: colors[4]}} onClick={() => pickColor(4)}></span>
            <span className='pick-color' style={{backgroundColor: colors[5]}} onClick={() => pickColor(5)}></span>
            <span className='pick-color' style={{backgroundColor: colors[6]}} onClick={() => pickColor(6)}></span>
        </div>
    )
}