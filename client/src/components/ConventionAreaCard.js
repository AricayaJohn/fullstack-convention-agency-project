import React from "react";
import { Link } from "react-router-dom";

function ConventionAreaCard({ area }) {
    return (
        <div>
            <h2>{area.location_name}</h2>
            <p>{area.venue}</p>
            <Link to={`/conventions/${area.id}`}>
            View Conventions in ${location_name}
            </Link>
        </div>
    )
}

export default ConventionAreaCard;