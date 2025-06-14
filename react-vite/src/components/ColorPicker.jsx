import './ColorPicker.css';

export default function ColorPicker({ setColor }) {

    const colors = {
        1: '#9e4d4d',
        2: '#ae7568',
        3: '#ba7b48',
        4: '#c2a43f',
        5: '#718c4c',
        6: '#73a2a1',
        7: '#7b7799',
        8: '#825c4c',
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
            <span className='pick-color' style={{backgroundColor: colors[7]}} onClick={() => pickColor(7)}></span>
            <span className='pick-color' style={{backgroundColor: colors[8]}} onClick={() => pickColor(8)}></span>
        </div>
    )
}