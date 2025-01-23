import React from "react";
import {Link} from "react-router-dom";

function ConventionCard({ convention, onDelete }){
    const handleDelete = () => {
        fetch(`/conventions/$convention.id`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                onDelete(convention.id);
            } else {
                throw new Error("Failed to delete convention");
            }
        })
        .catch(error => console.error('Error:', error));
    }
    return (
        <div>
            <h2>{convention.convention_name}</h2>
            <p> Days: {convention.days }</p>
            <Link to={`/attendees/${convention.id}`}>
            View Attendees
            </Link>
            <br/>
            <button onClick={handleDelete}>Delete Convention</button>
        </div>
    );
}

export default ConventionCard;