import React, {useState} from "react";

function AddAttendeeFrom({conventionId, onAddAttendee}) {
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/attendees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                profession,
                conventionId: parseInt(conventionId)
            }),
        })
        .then(response => response.json())
        .then(newAttendee => {
            onAddAttendee(newAttendee);
            setName("");
            setProfession("");
        })
        .catch(error => console.error('Error:', error));
    };
}