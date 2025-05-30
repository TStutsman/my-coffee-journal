import { useEffect, useState } from "react";
import BrewListItem from "@components";

function BrewList(){
    const [brews, setBrews] = useState([]);

    useEffect(() => {
        fetch('/api/brews/').then(res => res.json()).then(brews => setBrews(brews));
    }, []);

    return (
        <div className="brew-list">
            { brews.map(brew => (
                <BrewListItem key={brew.id} brew={brew}/>
            ))}
        </div>
    );
}

export default BrewList;