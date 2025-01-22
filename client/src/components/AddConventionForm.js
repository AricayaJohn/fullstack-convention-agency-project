import React, {useState} from "react";

function AddConventionForm({areaId, onAddConvention}) {
    const [conventionName, setConventionName] = useState("");
    const [days, setDays] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/conventions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                convention_name: conventionName,
                days: parseInt(days),
                convention_area_id: parseInt(areaId),
                attendee_id: parseInt(attendeeId)
            }),
        })
        .then(response => response.json())
        .then(newConvention => {
            onAddConvention(newConvention);
            setConventionName("");
            setDays("");
        })
        .catch(error => console.error('Error:', error));
    };
}