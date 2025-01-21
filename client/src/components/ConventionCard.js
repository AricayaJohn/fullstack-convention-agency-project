import React from "react";
import {Link} from "react-router-dom";

function ConventionCard({ convention }){
    return (
        <div>
            <h2>{convention.convention_name}</h2>
            <p> Days: {convention.days }</p>
            <Link to={`/attendees/${convention.id}`}>
            View Attendees
            </Link>
        </div>
    );
}

export default ConventionCard;