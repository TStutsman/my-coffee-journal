import { BrewListItem } from "@components";
import { useStore } from '@context';
import { useEffect, useState } from "react";
import './BrewList.css';

function BrewList(){
    const { brews, fetchBrews } = useStore();
    const [focusedBrew, setFocusedBrew] = useState(0);

    useEffect(() => {
        fetchBrews();
    }, [fetchBrews]);

    return (
        <div className="brew-list">
            { brews.map((brew, index) => (
                <BrewListItem 
                    key={brew.id} 
                    brew={brew} 
                    lift={focusedBrew >= index}
                    position={index+1}
                    focusBrew={() => setFocusedBrew(index)}
                />
            ))}
        </div>
    );
}

export default BrewList;