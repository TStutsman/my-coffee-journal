import { BrewListItem } from "@components";
import { useStore } from '@context';
import { useEffect } from "react";

function BrewList(){
    const { brews, fetchBrews } = useStore();

    useEffect(() => {
        fetchBrews();
    }, [fetchBrews]);

    return (
        <div className="brew-list">
            { brews.map(brew => (
                <BrewListItem key={brew.id} brew={brew}/>
            ))}
        </div>
    );
}

export default BrewList;