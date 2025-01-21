import React, { useEffect, useState } from "react";
import ConventionAreaCard from "./ConventionAreaCard";
import { Link } from "react-router-dom";

function HomePage(){
    const [conventionAreas, setConventionAreas] = useState([])

    useEffect(() => {
        fetch('/convention_areas')
        .then((response) => response.json())
        .then((data) => setConventionAreas(data))
    }, []);

    return (
        <div>
            <h1>Convention Areas</h1>
            <Link to="/add-convention-area">
            Add Convention Area
            </Link>
            {conventionAreas.map((area) => (
                <ConventionAreaCard key={area.id} area={area} />
            ))}
        </div>
    );
}

export default HomePage;