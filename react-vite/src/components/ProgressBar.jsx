import './ProgressBar.css';

function ProgressBar({ percentage, color }) {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${percentage}%`, backgroundColor: color}}></div>
        </div>
    );
}

export default ProgressBar;