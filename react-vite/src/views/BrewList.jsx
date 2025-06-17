import { BrewListItem } from "@components";
import { useStore } from '@context';
import { useEffect, useState } from "react";

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
                    show={focusedBrew == index}
                    focusBrew={() => setFocusedBrew(index)}
                />
            ))}
        </div>
    );
}

export default BrewList;